import router from "next/router";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

function OnlineWorskhopCard({
  name,
  description,
  videoURL,
  setVideoURL,
  displayed,
  image,
}: {
  name: string;
  description: string;
  videoURL: string | undefined;
  displayed: boolean;
  image: string;
  setVideoURL: (name: string) => void;
}) {
  const videoID = videoURL && videoURL.split("=").pop();
  console.log(videoID);
  return (
    <div
      className={` ${
        displayed
          ? "grid-cols-[30%_70%]"
          : "grid-cols-[30%_70%] md:grid-cols-1 "
      } mt-2 grid   h-[160px] w-full cursor-pointer overflow-hidden rounded-md border-[1px] border-base-content active:bg-base-content active:text-background sm:h-[180px]`}
      onClick={() => {
        videoID && setVideoURL(videoID);
        console.log(videoID);
      }}
    >
      <div
        className={`${
          displayed ? "relative h-full  " : " relative block h-full md:hidden"
        } `}
      >
        <Image
          src={image}
          objectFit="cover"
          className="rounded-l-md"
          alt="notfound"
          layout="fill"
        />
      </div>
      <div className="w-fill h-fill relative p-2 md:p-4">
        <h1 className=" font-raleway text-[16px] uppercase md:text-[35px]">
          {name}
        </h1>
        <p className=" flex w-fit text-[15px] line-clamp-4  md:text-xs">
          {description}
        </p>

        <button
          className=" absolute right-2 bottom-2 flex items-center gap-2 rounded-full border-[1px]  border-base-content bg-transparent px-2  active:border-primary active:bg-primary active:text-background md:px-4 md:py-1"
          onClick={() => {
            videoURL && router.push(videoURL);
          }}
        >
          Ir a YouTube
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
}
export default OnlineWorskhopCard;
