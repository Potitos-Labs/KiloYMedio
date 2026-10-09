import LegacyImage, { type ImageProps } from "next/legacy/image";
import { useState } from "react";
import { isR2ImageURL, placeholderImage } from "@utils/image";

export default function Image(props: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"] | null>(
    null,
  );
  const src =
    typeof props.src === "string" &&
    isR2ImageURL(props.src) &&
    failedSource !== props.src
      ? props.src
      : placeholderImage;
  return (
    <LegacyImage
      {...props}
      src={src}
      onError={(event) => {
        setFailedSource(props.src);
        props.onError?.(event);
      }}
    />
  );
}
