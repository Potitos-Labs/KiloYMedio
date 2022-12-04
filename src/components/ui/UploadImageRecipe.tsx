import { supabaseStorage, supabaseUrl } from "@utils/supabase";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export const UploadImageRecipe = ({
  setImageURL,
  value,
}: {
  setImageURL: (value: string) => void;
  value: string;
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
    <div className="">
      <div className="flex h-[540px] w-[540px] flex-col items-center justify-center rounded-[30px] border-[1px] border-base-300">
        <Image
          className="rounded-[30px]"
          src={value ? value : "/img/placeholder.jpg"}
          alt={value}
          height={540}
          width={540}
          layout="intrinsic"
          objectFit="cover"
          priority={true}
        />
        <div className="absolute flex flex-col items-center justify-center">
          <input
            className="file-input hidden w-full"
            onChange={uploadPhoto}
            type="file"
            id="files"
            accept="image/png, image/jpeg"
          />
          <label
            className="h-[60px] w-[60px] rounded-full border-none bg-[#AEAAA6] text-xl leading-none text-base-100 hover:cursor-pointer"
            htmlFor="files"
          >
            +
          </label>
          <div className="text-sm text-base-300">Máx 1MB</div>
        </div>
      </div>
      <p className="mt-2 text-start text-sm">Tamaño de imagen: {fileSize}MB</p>
    </div>
  );
};
