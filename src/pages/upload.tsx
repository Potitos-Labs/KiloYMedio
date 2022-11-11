import { UploadImage } from "@components/ui/UploadImage";
import Image from "next/image";
import { useState } from "react";

export default function Upload() {
  const [imageURL, setImageURL] = useState("");

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-5">
      <UploadImage setImageURL={setImageURL} />
      {imageURL && (
        <>
          <Image
            alt={imageURL}
            width={300}
            height={300}
            layout="intrinsic"
            src={imageURL}
            objectFit="cover"
          />
          <p>{imageURL}</p>
        </>
      )}
    </div>
  );
}
