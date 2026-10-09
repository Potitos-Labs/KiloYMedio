export async function uploadImage(file: File) {
  const response = await fetch("/api/images", {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  const result = (await response.json()) as { url?: string; message?: string };
  if (!response.ok || !result.url)
    throw new Error(result.message ?? "No se pudo subir la imagen.");
  return result.url;
}
