import { trpc } from "@utils/trpc";
import { IWorkshop } from "@utils/validations/workshop";
import { useSession } from "next-auth/react";
import Image from "next/image";
import EnrollButton from "./EnrollButon";

function OnsiteWorskhopCard({
  workshop,
  setImageURL,
  displayed,
}: {
  workshop: IWorkshop;
  displayed: boolean;
  setImageURL: (name: string) => void;
}) {
  const { data: enrollCliens } =
    trpc.workshop.getWorkshopsParticipants.useQuery({
      onSiteWorkshopId: workshop.id || "",
    });
  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

  return (
    <div
      className={` ${
        displayed
          ? "grid-cols-[30%_70%]"
          : "grid-cols-[30%_70%] md:grid-cols-1 "
      } mt-2 grid   h-[160px] w-full cursor-pointer overflow-hidden rounded-md border-[1px] border-base-content active:bg-base-content active:text-background sm:h-[180px]`}
      onMouseEnter={() => {
        setImageURL(workshop.imageURL);
      }}
    >
      <div
        className={`${
          displayed ? "relative h-full" : " relative block h-full md:hidden"
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
        {
          <div className="mb-1 flex  w-full justify-end align-middle text-[10px] md:text-xs">
            <p>{enrollCliens + "/" + workshop.OnSiteWorkshop?.places}</p>
          </div>
        }
        <h1 className=" font-raleway text-[16px] uppercase lg:text-[35px]">
          {workshop.name}
        </h1>
        <p className=" flex w-fit text-[15px] line-clamp-2  md:text-xs">
          {workshop.description}
        </p>
        {workshop.id && session && !isAdmin && (
          <EnrollButton OnsiteworkshopID={workshop.id} />
        )}
      </div>
    </div>
  );
}
export default OnsiteWorskhopCard;
