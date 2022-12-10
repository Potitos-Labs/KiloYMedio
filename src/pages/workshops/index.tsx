import Layout from "@components/Layout";
import OnlineWorkshopCard from "@components/workshop/tinyComponents/OnlineWorkshopCard";
import OnsiteWorkshopCard from "@components/workshop/tinyComponents/OnsiteWorkshopCard";
import WorkshopSearchBar from "@components/workshop/tinyComponents/WorkshopSearchBar";
import { trpc } from "@utils/trpc";
import Image from "next/image";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import YouTube from "react-youtube";

export default function Workshops() {
  const [showOnsite, setShowOnsite] = useState(true);
  const [image, setImage] = useState(String);
  const [video, setVideo] = useState(String);
  const [showMore, setShowMore] = useState(true);
  const [skip, setskip] = useState(0);
  const youtubeOpts = {
    height: "556",
    width: "102%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  {
    /* Talleres presenciales */
  }
  const { data: OnsiteWorkshops } =
    trpc.workshop.getAllOnsiteWorkshops.useQuery({ skipworkshops: skip });
  const { data: maxSkipOnsiteWorkshops } =
    trpc.workshop.getNumberOnsiteWorkshops.useQuery();

  function incrementSkip() {
    skip + 3 < (maxSkipOnsiteWorkshops || 0) && setskip(skip + 3);
  }
  function decrementSkip() {
    skip - 3 >= 0 && setskip(skip - 3);
  }
  {
    /* Talleres Online */
  }
  const { data: OnlineWorkshops } =
    trpc.workshop.getAllOnlineWorkshops.useQuery({ skipworkshops: 0 });
  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="px-4 ">
        {/*---CABECERA---*/}
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
        {/*---TALLERES DISPLAYER CHIQUITO---*/}
        <div className="my-3 mb-2 grid h-full w-full grid-cols-1 flex-col gap-2 md:mb-3  md:grid-cols-[45%_55%]">
          <div id="CARDS" className="">
            {showOnsite
              ? OnsiteWorkshops?.slice(0, 3).map((workshop, index) => {
                  return (
                    <OnsiteWorkshopCard
                      key={index}
                      workshop={workshop}
                      displayed={false}
                      setImageURL={setImage}
                    />
                  );
                })
              : OnlineWorkshops?.slice(0, 3).map((workshop, index) => {
                  return (
                    <OnlineWorkshopCard
                      key={index}
                      workshop={workshop}
                      setVideoURL={setVideo}
                      displayed={false}
                    />
                  );
                })}
          </div>

          {/*---DISPLAYER VIDEO/FOTO---*/}
          <div
            id="PICTURES"
            className="relative mt-2 mr-2 hidden items-center justify-items-center overflow-hidden rounded-lg border-[1px] border-base-content align-middle md:block"
          >
            {showOnsite ? (
              <div>
                <div className="absolute z-10 m-3  flex gap-3">
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
            ) : (
              <div className="h-full w-full items-center justify-items-center align-middle">
                {video ? (
                  <YouTube
                    videoId={video}
                    opts={youtubeOpts}
                    className={"hidden md:block"}
                  />
                ) : (
                  <p className="absolute top-1/2 left-[40%]   text-center align-middle">
                    ¡Selecciona un vídeo! 😊
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/*---MOSTRAR MÁS---*/}
        <div className={`${!showMore && "mb-6"}`}>
          {((showOnsite && (OnsiteWorkshops || []).length > 3 && showMore) ||
            (!showOnsite &&
              (OnlineWorkshops || []).length > 3 &&
              showMore)) && (
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
          {!showMore &&
            (showOnsite
              ? OnsiteWorkshops?.slice(3, OnsiteWorkshops?.length).map(
                  (workshop, index) => {
                    console.log(workshop.OnSiteWorkshop?.date);
                    return (
                      <OnsiteWorkshopCard
                        key={index}
                        workshop={workshop}
                        setImageURL={setImage}
                        displayed={true}
                      />
                    );
                  },
                )
              : OnlineWorkshops?.slice(3, OnsiteWorkshops?.length).map(
                  (workshop, index) => {
                    console.log(workshop);
                    return (
                      <OnlineWorkshopCard
                        key={index}
                        workshop={workshop}
                        setVideoURL={setVideo}
                        displayed={false}
                      />
                    );
                  },
                ))}
        </div>
        <div className="flex w-full gap-4">
          <button
            className={`flex items-center gap-2 rounded-md border-[1px] border-base-300 p-2 ${
              skip == 0 && "disabled:opacity-50"
            }`}
            onClick={decrementSkip}
            disabled={skip == 0 ? true : false}
          >
            <BsArrowLeft />
            Anterior
          </button>
          <button
            className={`flex items-center gap-2 rounded-md border-[1px] border-base-300 p-2 ${
              skip + 3 >= (maxSkipOnsiteWorkshops || 0) && "disabled:opacity-50"
            }`}
            onClick={incrementSkip}
            disabled={skip + 3 >= (maxSkipOnsiteWorkshops || 0) ? true : false}
          >
            <BsArrowRight />
            Siguiente
          </button>
        </div>
      </div>
    </Layout>
  );
}
