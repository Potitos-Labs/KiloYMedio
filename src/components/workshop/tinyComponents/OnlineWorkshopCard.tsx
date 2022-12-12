import router from "next/router";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { IWorkshop } from "@utils/validations/workshop";

function OnlineWorskhopCard({
  workshop,
  setVideoURL,
  displayed,
}: {
  workshop: IWorkshop;
  displayed: boolean;
  setVideoURL: (name: string) => void;
}) {
  const videoID =
    workshop.OnlineWorkshop?.videoURL &&
    workshop.OnlineWorkshop?.videoURL.split("=").pop();
  console.log(videoID);
  const { status } = useSession();

  function putVideo() {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      workshop.OnlineWorkshop?.videoURL &&
        router.push(workshop.OnlineWorkshop?.videoURL);
    }
  }

  function displayVideo() {
    if (status === "unauthenticated") {
      router.push("/login?prev=/workshops");
    } else {
      videoID && setVideoURL(videoID);
    }
  }

  return (
    <div
      className={` ${
        displayed
          ? "grid-cols-[30%_70%]"
          : "grid-cols-[30%_70%] md:grid-cols-1 "
      } mt-2 grid   h-[160px] w-full cursor-pointer overflow-hidden rounded-md border-[1px] border-base-content active:bg-base-content active:text-background sm:h-[180px]`}
      onClick={() => displayVideo()}
    >
      <div
        className={`${
          displayed ? "relative h-full  " : " relative block h-full md:hidden"
        } `}
      >
        <Image
          src={workshop.imageURL}
          objectFit="cover"
          className="rounded-l-md"
          alt="notfound"
          layout="fill"
        />
      </div>
      <div className="w-fill h-fill relative p-2 md:p-4">
        <h1 className=" font-raleway text-[16px] uppercase md:text-[35px]">
          {workshop.name}
        </h1>
        <p className=" flex w-fit text-[15px] line-clamp-4  md:text-xs">
          {workshop.description}
        </p>

        <button
          className=" absolute right-2 bottom-2 flex items-center gap-2 rounded-full border-[1px]  border-base-content bg-transparent px-2  active:border-primary active:bg-primary active:text-background md:px-4 md:py-1"
          onClick={() => putVideo()}
        >
          Ir a YouTube
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
}
export default OnlineWorskhopCard;
