import Layout from "@components/Layout";
import WorkshopCard from "@components/workshop/tinyComponents/WorkshopCard";
import WorkshopSearchBar from "@components/workshop/tinyComponents/WorkshopSearchBar";
import { trpc } from "@utils/trpc";
import Image from "next/image";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function Workshops() {
  const [showOnsite, setShowOnsite] = useState(true);
  const [image, setImage] = useState(String);
  const [showMore, setShowMore] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: OnsiteWorkshops } =
    trpc.workshop.getAllOnsiteWorkshops.useQuery();
  const { data: OnlineWorkshops } =
    trpc.workshop.getAllOnlineWorkshops.useQuery();
  console.log(activeIndex);
  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className=" px-4 py-1">
        <div className="grid grid-cols-1 sm:grid-cols-[80%_20%] ">
          <div className="  mb-2 grid grid-cols-2 gap-2 font-raleway sm:mb-0 sm:flex">
            <button
              className={`${
                !showOnsite && "border-primary bg-primary text-background"
              } h-full rounded-full border-[1px]  border-base-content  px-4 py-1 sm:py-2`}
              onClick={() => {
                setShowOnsite(false);
                setShowMore(true);
              }}
            >
              ONLINE
            </button>
            <button
              className={`${
                showOnsite && "border-primary bg-primary text-background"
              } h-full rounded-full border-[1px] border-base-content px-4 `}
              onClick={() => {
                setShowOnsite(true);
                setShowMore(true);
              }}
            >
              PRESENCIAL
            </button>
          </div>

          <WorkshopSearchBar />
        </div>
        <div className="my-3 mb-2 grid h-full w-full grid-cols-1 flex-col gap-2 md:grid-cols-[45%_55%]">
          <div id="CARDS" className="">
            {showOnsite
              ? OnsiteWorkshops?.slice(0, 3).map((workshop, index) => {
                  console.log(workshop.Onsite?.date);
                  return (
                    <WorkshopCard
                      key={index}
                      name={workshop.name}
                      description={workshop.description}
                      date={workshop.Onsite?.date}
                      imageURL={workshop.imageURL}
                      setImageURL={setImage}
                      index={index}
                      displayed={false}
                      setIndex={setActiveIndex}
                    />
                  );
                })
              : OnlineWorkshops?.slice(0, 3).map((workshop, index) => {
                  return (
                    <WorkshopCard
                      key={index}
                      name={workshop.name}
                      description={workshop.description}
                      date={null}
                      imageURL={workshop.imageURL}
                      setImageURL={setImage}
                      index={index}
                      displayed={false}
                      setIndex={setActiveIndex}
                    />
                  );
                })}
          </div>
          <div
            id="PICTURES"
            className="relative mt-2 mr-2 hidden rounded-lg border-[1px] border-base-content md:block"
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
              src={image}
              objectFit="cover"
              className="rounded-lg "
              alt="notfound"
              layout="fill"
            />
          </div>
        </div>
        <div className="">
          {((showOnsite && (OnsiteWorkshops || []).length > 3 && showMore) ||
            (showOnsite && (OnsiteWorkshops || []).length > 3 && showMore)) && (
            <div className=" flex justify-center md:justify-start">
              <button
                className="mb-4 flex h-full items-center  gap-2 rounded-full border-[1px] border-base-content px-4  py-2  font-raleway active:border-primary active:bg-primary active:text-background"
                onClick={() => setShowMore(false)}
              >
                VER MÁS
                <BsArrowRight />
              </button>
            </div>
          )}
          {!showMore
            ? OnsiteWorkshops?.slice(3, OnsiteWorkshops?.length).map(
                (workshop, index) => {
                  console.log(workshop.Onsite?.date);
                  return (
                    <WorkshopCard
                      key={index}
                      name={workshop.name}
                      description={workshop.description}
                      date={workshop.Onsite?.date}
                      imageURL={workshop.imageURL}
                      setImageURL={setImage}
                      index={index}
                      displayed={true}
                      setIndex={setActiveIndex}
                    />
                  );
                },
              )
            : OnlineWorkshops?.slice(3, OnsiteWorkshops?.length).map(
                (workshop, index) => {
                  return (
                    <WorkshopCard
                      key={index}
                      name={workshop.name}
                      description={workshop.description}
                      date={null}
                      imageURL={workshop.imageURL}
                      setImageURL={setImage}
                      index={index}
                      displayed={true}
                      setIndex={setActiveIndex}
                    />
                  );
                },
              )}
        </div>
      </div>
    </Layout>
  );
}
