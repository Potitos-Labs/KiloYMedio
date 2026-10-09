import { Writable } from "node:stream";
import type { NextApiRequest, NextApiResponse } from "next";
import image from "../../pages/api/images/[...key]";

const storage = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: () => ({ env: { IMAGES_BUCKET: storage } }),
}));

class Response extends Writable {
  headers: Record<string, string | number> = {};
  chunks: Buffer[] = [];
  setHeader(name: string, value: string | number) {
    this.headers[name] = value;
    return this;
  }
  _write(chunk: Buffer, _encoding: BufferEncoding, done: () => void) {
    this.chunks.push(chunk);
    done();
  }
}

test.each(["GET", "HEAD"])(
  "%s streams R2 images with their stored metadata",
  async (method) => {
    const bytes = new Uint8Array([1, 2, 3, 4, 5]);
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(bytes);
        controller.close();
      },
    });
    const arrayBuffer = vi.fn(() => {
      throw new Error("The image must not be buffered");
    });
    storage.get.mockResolvedValue({
      body,
      size: bytes.length,
      httpEtag: '"stored-etag"',
      httpMetadata: { contentType: "image/webp" },
      arrayBuffer,
    });
    const response = new Response();
    await image(
      {
        method,
        query: { key: ["site", "00000000-0000-4000-a000-000000000001.webp"] },
      } as unknown as NextApiRequest,
      response as unknown as NextApiResponse,
    );
    expect(arrayBuffer).not.toHaveBeenCalled();
    expect(response.headers["Content-Type"]).toBe("image/webp");
    expect(response.headers["Content-Length"]).toBe(bytes.length);
    expect(response.headers["ETag"]).toBe('"stored-etag"');
    expect(Buffer.concat(response.chunks)).toEqual(
      method === "GET" ? Buffer.from(bytes) : Buffer.alloc(0),
    );
  },
);
