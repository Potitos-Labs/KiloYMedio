import Layout from "@components/Layout";
import WorkshopCard from "@components/workshop/tinyComponents/WorkshopCard";
import WorkshopSearchBar from "@components/workshop/tinyComponents/WorkshopSearchBar";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

export default function Workshops() {
  // const { data: onlineWorkshops } =
  //   trpc.workshop.getAllOnlineWorkshops.useQuery();
  // const { data: onsiteWorkshops } =
  //   trpc.workshop.getAllOnsiteWorkshops.useQuery();
  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className=" px-4 py-1">
        <div className="grid grid-cols-1 sm:grid-cols-[80%_20%] ">
          <div className=" sm: mb-2 grid grid-cols-2 gap-2 font-raleway sm:mb-0 sm:flex">
            <button className="h-full rounded-full border-[1px]  border-base-content  px-4 py-1 sm:py-2">
              ONLINE
            </button>
            <button className="h-full rounded-full border-base-content bg-primary px-4 text-background ">
              PRESENCIAL
            </button>
          </div>

          <WorkshopSearchBar />
        </div>
        <div className="my-3 mb-2 grid h-full w-full grid-cols-1 flex-col gap-2 md:grid-cols-[45%_55%]">
          <div id="CARDS" className="">
            <WorkshopCard />
            <WorkshopCard />
            <WorkshopCard />
          </div>
          <div
            id="PICTURES"
            className="relative mb-3 hidden rounded-lg border-[1px] border-base-content md:block"
          >
            <div className="absolute z-10 m-3  flex gap-3">
              <button className="h-full rounded-full border-[1px] border-base-content px-4  py-2 ">
                Inscribirse
              </button>
              <button className="h-full rounded-full border-[1px]  border-base-content  px-4 py-2">
                Saber más
              </button>
            </div>
            <Image
              src="/img/fondoCucharasSinFondo.png"
              objectFit="cover"
              alt="notfound"
              layout="fill"
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <button className="mb-4 flex h-full items-center  gap-2 rounded-full border-[1px] border-base-content px-4  py-2  font-raleway">
            VER MÁS
            <BsArrowRight />
          </button>
        </div>
      </div>
    </Layout>
  );
}
