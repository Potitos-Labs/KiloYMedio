// import { supabaseStorage, supabaseUrl } from "@utils/supabase";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import Image from "next/image";

export default function Upload() {
  // const [imageURL, setImageURL] = useState("");
  // const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.currentTarget.files?.item(0);
  //   if (!file) return;

  //   const pathFile = `images/${uuidv4()}-${file.name}`;
  //   const { data, error } = await supabaseStorage.upload(pathFile, file);

  //   if (!error) {
  //     setImageURL(`${supabaseUrl}/storage/v1/object/public/images/${pathFile}`);
  //   }

  //   console.log({ data, error });
  // };

  return (
    <div> </div>
    // <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-5">
    //   <p>Upload a .png or .jpg image (max 1MB).</p>
    //   <input
    //     className="file-input w-full max-w-xs"
    //     onChange={uploadPhoto}
    //     type="file"
    //     accept="image/png, image/jpeg"
    //   />
    //   {imageURL && (
    //     <Image
    //       alt={imageURL}
    //       width={300}
    //       height={300}
    //       layout="intrinsic"
    //       src={imageURL}
    //       objectFit="cover"
    //     />
    //   )}
    // </div>
  );
}
