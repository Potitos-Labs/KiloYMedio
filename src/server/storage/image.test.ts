import { imageExtension } from "./image";

test("image upload rejects content disguised as a PNG or JPEG", () => {
  expect(
    imageExtension(
      new TextEncoder().encode("<svg onload='alert(1)'/>"),
      "image/png",
    ),
  ).toBeNull();
  expect(
    imageExtension(
      new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
      "image/png",
    ),
  ).toBe("png");
  expect(imageExtension(new Uint8Array([255, 216, 255]), "image/jpeg")).toBe(
    "jpg",
  );
  expect(
    imageExtension(new Uint8Array([255, 216, 255]), "image/svg+xml"),
  ).toBeNull();
});
