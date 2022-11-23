import { supabaseStorage, supabaseUrl } from "@utils/supabase";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UploadImage = ({
  setImageURL,
}: {
  setImageURL: (value: string) => void;
}) => {
  const [fileSize, setFileSize] = useState("0   ");
  const uploadPhoto = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.item(0);

      if (!file) return;

      const fileSize = file.size / 1024 / 1024;
      setFileSize(fileSize.toFixed(2));

      if (fileSize > 1) {
        return;
      }

      const pathFile = `images/${uuidv4()}`;
      const { data, error } = await supabaseStorage.upload(pathFile, file);

      if (!error) {
        setImageURL(
          `${supabaseUrl}/storage/v1/object/public/images/${pathFile}`,
        );
      }

      console.log({ data, error });
    },
    [setImageURL],
  );
  return (
    <div className="flex flex-col items-center">
      <p>
        Sube una imagen .png o .jpg <b>(max 1MB).</b>
      </p>
      <input
        className="file-input w-full max-w-xs"
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
      <p className="font-sans font-bold">Tamaño de imagen: {fileSize}MB</p>
    </div>
  );
};
