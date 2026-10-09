export const maxImageBytes = 1024 * 1024;
export function imageExtension(bytes: Uint8Array, contentType: string) {
  if (
    contentType === "image/png" &&
    [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte)
  )
    return "png";
  if (
    contentType === "image/jpeg" &&
    bytes[0] === 255 &&
    bytes[1] === 216 &&
    bytes[2] === 255
  )
    return "jpg";
  return null;
}
