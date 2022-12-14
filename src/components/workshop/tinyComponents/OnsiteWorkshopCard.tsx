import { trpc } from "@utils/trpc";
import { IWorkshop } from "@utils/validations/workshop";
import { useSession } from "next-auth/react";
import Image from "next/image";
import EnrollButton from "./EnrollButon";

function OnsiteWorskhopCard({
  workshop,
  setImageURL,
  myIndex,
  indexGlobal,
  setIndex,
  displayed,
}: {
  workshop: IWorkshop;
  displayed: boolean;
  setImageURL: (name: string) => void;
  indexGlobal: number;
  myIndex: number;
  setIndex: (index: number) => void;
}) {
  const { data: enrollCliens } =
    trpc.workshop.getWorkshopsParticipants.useQuery({
      onSiteWorkshopId: workshop.id || "",
    });
  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

  return (
    <div
      className={`${
        indexGlobal == myIndex && "bg-base-content text-base-100"
      } ${
        displayed ? "grid-cols-[30%_70%]" : "grid-cols-[30%_70%] md:grid-cols-1"
      } mt-2 grid h-[160px] w-full cursor-pointer overflow-hidden rounded-md border-[1px] border-base-content sm:h-[180px]`}
      onMouseEnter={() => {
        setImageURL(workshop.imageURL);
        setIndex(myIndex);
      }}
    >
      <div className={`relative h-full ${!displayed && "block md:hidden"} `}>
        <Image
          src={workshop.imageURL}
          objectFit="cover"
          className="rounded-l-md"
          alt="notfound"
          layout="fill"
        />
      </div>
      <div className="relative grid content-between p-2 md:p-4">
        <div className="flex justify-between">
          <h1 className="font-raleway text-[16px] uppercase lg:text-[35px]">
            {workshop.name}
          </h1>
          <div className="flex text-[10px] md:text-xs">
            <p>{enrollCliens + "/" + workshop.OnSiteWorkshop?.places}</p>
          </div>
        </div>
        <p className="flex w-fit text-[15px] line-clamp-2 md:text-xs">
          {workshop.description}
        </p>
        <div className="flex items-end justify-between">
          {workshop.OnSiteWorkshop?.date.toLocaleDateString()}
          {workshop.id && session && !isAdmin && (
            <EnrollButton
              OnsiteworkshopID={workshop.id}
              OnsiteWorkshopName={workshop.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default OnsiteWorskhopCard;
