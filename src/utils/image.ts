export const defaultUserImage =
  "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png";
export const placeholderImage =
  "/api/images/site/7f512f27-78ed-ae43-c9dd-a916a415f30e.webp";

export const r2ImagePathPattern =
  /^\/api\/images\/[a-zA-Z0-9_-]{1,64}\/[a-f0-9-]{36}\.(png|jpg|webp|svg|gif|ico)$/;

export function isR2ImageURL(value: string) {
  return r2ImagePathPattern.test(value);
}
