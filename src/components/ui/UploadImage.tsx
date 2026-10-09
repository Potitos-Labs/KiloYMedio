import { uploadImage } from "@utils/upload-image";
import { useCallback, useState } from "react";

export const UploadImage = ({
  setImageURL,
}: {
  setImageURL: (value: string) => void;
}) => {
  const [fileSize, setFileSize] = useState("0   ");
  const [error, setError] = useState("");
  const uploadPhoto = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.item(0);

      if (!file) return;

      const fileSize = file.size / 1024 / 1024;
      setFileSize(fileSize.toFixed(2));

      if (fileSize > 1) {
        setError("La imagen no puede superar 1 MB.");
        return;
      }

      setError("");
      try {
        setImageURL(await uploadImage(file));
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudo subir la imagen.",
        );
      }
    },
    [setImageURL],
  );
  return (
    <div className="flex flex-col items-center rounded-lg border-2 border-base-300 p-2">
      <p>
        Sube una imagen .png o .jpg <b>(max 1MB).</b>
      </p>
      {error && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}
      <input
        className="block w-full cursor-pointer rounded-md border border-gray-300 bg-base-100 text-sm text-base-300"
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
      <p className="font-sans font-bold">Tamaño de imagen: {fileSize}MB</p>
    </div>
  );
};
