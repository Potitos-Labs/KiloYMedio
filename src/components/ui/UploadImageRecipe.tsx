import { supabaseStorage, supabaseUrl } from "@utils/supabase";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export const UploadImageRecipe = ({
  setImageURL,
  value,
  profileStyle,
}: {
  setImageURL: (value: string) => void;
  value: string;
  profileStyle?: string;
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
    <div>
      <div
        className={`${
          profileStyle ??
          "h-[300px] w-[300px] rounded-[30px] md:h-[420px] md:w-[420px]"
        } flex flex-col items-center justify-center border-[1px] border-base-300`}
      >
        <Image
          className={`${profileStyle ?? "rounded-[30px]"}`}
          src={value ? value : ""}
          alt={value}
          height={420}
          width={420}
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
            className={`${
              profileStyle && "opacity-60 hover:opacity-100"
            } h-[60px] w-[60px] rounded-full bg-[#AEAAA6] text-xl leading-none text-base-100 hover:cursor-pointer`}
            htmlFor="files"
          >
            +
          </label>
          <div className={`${profileStyle && "hidden"} text-sm`}>Máx 1MB</div>
        </div>
      </div>
      <p className={`${profileStyle && "hidden"} mt-2 text-start text-sm`}>
        Tamaño de imagen: {fileSize}MB
      </p>
    </div>
  );
};
