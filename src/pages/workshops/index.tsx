import Layout from "@components/Layout";
import WorkshopCard from "@components/workshop/tinyComponents/WorkshopCard";
import WorkshopSearchBar from "@components/workshop/tinyComponents/WorkshopSearchBar";
import { trpc } from "@utils/trpc";
import Image from "next/image";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function Workshops() {
  const [showOnsite, setShowOnsite] = useState(true);
  const { data: OnsiteWorkshops } =
    trpc.workshop.getAllOnsiteWorkshops.useQuery();
  const { data: OnlineWorkshops } =
    trpc.workshop.getAllOnlineWorkshops.useQuery();

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className=" px-4 py-1">
        <div className="grid grid-cols-1 sm:grid-cols-[80%_20%] ">
          <div className=" sm: mb-2 grid grid-cols-2 gap-2 font-raleway sm:mb-0 sm:flex">
            <button
              className={`${
                !showOnsite && "border-primary bg-primary text-background"
              } h-full rounded-full border-[1px]  border-base-content  px-4 py-1 sm:py-2`}
              onClick={() => setShowOnsite(false)}
            >
              ONLINE
            </button>
            <button
              className={`${
                showOnsite && "border-primary bg-primary text-background"
              } h-full rounded-full border-[1px] border-base-content px-4 `}
              onClick={() => setShowOnsite(true)}
            >
              PRESENCIAL
            </button>
          </div>

          <WorkshopSearchBar />
        </div>
        <div className="my-3 mb-2 grid h-full w-full grid-cols-1 flex-col gap-2 md:grid-cols-[45%_55%]">
          <div id="CARDS" className="">
            {showOnsite
              ? OnsiteWorkshops?.map((workshop, index) => {
                  console.log(workshop.Onsite?.date);
                  return (
                    <WorkshopCard
                      key={index}
                      name={workshop.name}
                      description={workshop.description}
                      date={workshop.Onsite?.date}
                    />
                  );
                })
              : OnlineWorkshops?.map((workshop, index) => {
                  return (
                    <WorkshopCard
                      key={index}
                      name={workshop.name}
                      description={workshop.description}
                      date={null}
                    />
                  );
                })}
          </div>
          <div
            id="PICTURES"
            className="relative mb-2 hidden rounded-lg border-[1px] border-base-content md:block"
          >
            <div className="absolute z-10 m-3  flex gap-3">
              <button className="h-full rounded-full border-[1px] border-base-content bg-background px-4  py-2 active:border-primary active:bg-primary active:text-background">
                Inscribirse
              </button>
              <button className="h-full rounded-full border-[1px] border-base-content bg-background  px-4 py-2 active:border-primary active:bg-primary active:text-background">
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
