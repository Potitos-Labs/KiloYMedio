import Layout from "@components/Layout";
import WorkshopCard from "@components/workshop/tinyComponents/WorkshopCard";
import WorkshopSearchBar from "@components/workshop/tinyComponents/WorkshopSearchBar";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

export default function Workshops() {
  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="px-4 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-[80%_20%] ">
          <div className=" mb-2 flex gap-2 font-raleway sm:mb-0">
            <button className="h-full rounded-full border-[1px]  border-base-content  px-4 py-1 sm:py-2">
              ONLINE
            </button>
            <button className="h-full rounded-full border-base-content bg-primary px-4 text-background ">
              PRESENCIAL
            </button>
          </div>

          <WorkshopSearchBar />
        </div>
        <div className="my-3 grid w-full grid-cols-[45%_55%] flex-col gap-2">
          <div id="CARDS" className="">
            <WorkshopCard />
            <WorkshopCard />
            <WorkshopCard />
          </div>
          <div
            id="PICTURES"
            className="relative mb-2  rounded-lg border-[1px] border-base-content"
          >
            <Image
              src="/img/fondoCucharasSinFondo.png"
              objectFit="cover"
              alt="notfound"
              layout="fill"
            />
          </div>
        </div>
        <button className="mb-3 flex h-full items-center gap-2 rounded-full border-[1px] border-base-content px-4  py-2  font-raleway">
          VER MÁS
          <BsArrowRight />
        </button>
      </div>
    </Layout>
  );
}
