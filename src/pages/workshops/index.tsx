import Layout from "@components/Layout";
import OnlineWorkshopCard from "@components/workshop/tinyComponents/OnlineWorkshopCard";
import OnsiteWorkshopCard from "@components/workshop/tinyComponents/OnsiteWorkshopCard";
import { trpc } from "@utils/trpc";
import Image from "next/image";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import YouTube from "react-youtube";

export default function Workshops() {
  const [showOnsite, setShowOnsite] = useState(true);
  const [image, setImage] = useState("/talleresGang.png");
  const [video, setVideo] = useState(String);
  const [indexGlobal, setIndexGlobal] = useState(-1);
  const [showMore, setShowMore] = useState(true);
  const [skipOnline, setskipOnline] = useState(0);
  const [skipOnsite, setskipOnsite] = useState(0);
  const youtubeOpts = {
    height: "556",
    width: "102%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const { data: OnsiteWorkshops } =
    trpc.workshop.getAllOnsiteWorkshops.useQuery({ skipworkshops: skipOnsite });
  const { data: maxSkipOnsiteWorkshops } =
    trpc.workshop.getNumberOnsiteWorkshops.useQuery();

  const { data: OnlineWorkshops } =
    trpc.workshop.getAllOnlineWorkshops.useQuery({ skipworkshops: skipOnline });
  const { data: maxSkipOnlineWorkshops } =
    trpc.workshop.getNumberOnlineWorkshops.useQuery();

  function incrementSkip() {
    setIndexGlobal(-1);
    if (showOnsite) {
      skipOnsite + 3 < (maxSkipOnsiteWorkshops || 0) &&
        setskipOnsite(skipOnsite + 3);
    } else {
      skipOnline + 3 < (maxSkipOnlineWorkshops || 0) &&
        setskipOnline(skipOnline + 3);
    }
  }
  function decrementSkip() {
    setIndexGlobal(-1);
    if (showOnsite) {
      skipOnsite - 3 >= 0 && setskipOnsite(skipOnsite - 3);
    } else {
      skipOnline - 3 >= 0 && setskipOnline(skipOnline - 3);
    }
  }

  return (
    <Layout bgColor="bg-base-100" headerBgLight={true} headerTextDark={true}>
      <div className="my-4 h-[680px] px-6">
        {/*---CABECERA---*/}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[80%_20%] sm:gap-0">
          <div className="grid grid-cols-2 gap-2 font-raleway sm:flex">
            <button
              className={`${
                !showOnsite && "border-primary bg-primary text-base-100"
              } h-full rounded-full border-[1px] border-base-content px-4 py-1 sm:py-2`}
              onClick={() => {
                setShowOnsite(false);
                setShowMore(true);
                setIndexGlobal(-1);
              }}
            >
              ONLINE
            </button>
            <button
              className={`${
                showOnsite && "border-primary bg-primary text-base-100"
              } h-full rounded-full border-[1px] border-base-content px-4`}
              onClick={() => {
                setShowOnsite(true);
                setShowMore(true);
                setIndexGlobal(-1);
              }}
            >
              PRESENCIAL
            </button>
          </div>
        </div>
        {/*---TALLERES DISPLAYER CHIQUITO---*/}
        <div className="my-3 mb-2 grid h-[520px] w-full grid-cols-1 flex-col gap-2 sm:h-[565px] md:grid-cols-[45%_55%]">
          <div id="CARDS">
            {showOnsite
              ? OnsiteWorkshops?.slice(0, 3).map((workshop, index) => {
                  return (
                    <OnsiteWorkshopCard
                      key={index}
                      myIndex={index}
                      indexGlobal={indexGlobal}
                      setIndex={setIndexGlobal}
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
                      myIndex={index}
                      indexGlobal={indexGlobal}
                      setIndexGlobal={setIndexGlobal}
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
                <Image
                  src={image}
                  objectFit="cover"
                  className="rounded-lg"
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
                  <p className="absolute top-1/2 left-[40%] text-center align-middle">
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
            <div className="flex justify-center md:justify-start">
              <button
                className="mb-4 flex h-full items-center gap-2 rounded-full border-[1px] border-base-content px-4  py-2  font-raleway active:border-primary active:bg-primary active:text-base-100"
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
                        myIndex={index}
                        indexGlobal={indexGlobal}
                        setIndex={setIndexGlobal}
                        workshop={workshop}
                        displayed={false}
                        setImageURL={setImage}
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
                        myIndex={index}
                        indexGlobal={indexGlobal}
                        setIndexGlobal={setIndexGlobal}
                        workshop={workshop}
                        setVideoURL={setVideo}
                        displayed={false}
                      />
                    );
                  },
                ))}
        </div>
        <div className={`flex w-full gap-2 ${!showOnsite && "hidden"}`}>
          <button
            className={`flex items-center gap-2 rounded-full border-[1px] border-base-300 p-2 ${
              skipOnsite == 0 && "disabled:opacity-50"
            }`}
            onClick={decrementSkip}
            disabled={skipOnsite == 0 ? true : false}
          >
            <BsArrowLeft />
            Anterior
          </button>
          <button
            className={`flex items-center gap-2 rounded-full border-[1px] border-base-300 p-2 ${
              skipOnsite + 3 >= (maxSkipOnsiteWorkshops || 0) &&
              "disabled:opacity-50"
            }`}
            onClick={incrementSkip}
            disabled={
              skipOnsite + 3 >= (maxSkipOnsiteWorkshops || 0) ? true : false
            }
          >
            Siguiente
            <BsArrowRight />
          </button>
        </div>
        <div className={`flex w-full gap-2 ${showOnsite && "hidden"}`}>
          <button
            className={`flex items-center gap-2 rounded-full border-[1px] border-base-300 p-2 ${
              skipOnline == 0 && "disabled:opacity-50"
            }`}
            onClick={decrementSkip}
            disabled={skipOnline == 0 ? true : false}
          >
            <BsArrowLeft />
            Anterior
          </button>
          <button
            className={`flex items-center gap-2 rounded-full border-[1px] border-base-300 p-2 ${
              skipOnline + 3 >= (maxSkipOnlineWorkshops || 0) &&
              "disabled:opacity-50"
            }`}
            onClick={incrementSkip}
            disabled={
              skipOnline + 3 >= (maxSkipOnlineWorkshops || 0) ? true : false
            }
          >
            Siguiente
            <BsArrowRight />
          </button>
        </div>
      </div>
    </Layout>
  );
}
