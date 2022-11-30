function WorskhopCard({
  name,
  description,
  date,
  imageURL,
  setImageURL,
  displayed,
  index,
  setIndex,
}: {
  name: string;
  description: string;
  date: Date | undefined | null;
  imageURL: string;
  displayed: boolean;
  index: number;
  setImageURL: (name: string) => void;
  setIndex: (index: number) => void;
}) {
  console.log(date);
  return (
    <div
      className={` ${
        !displayed && "pl-0 sm:pl-8"
      } mb-2 block h-[180px]  w-full cursor-pointer rounded-md border-[1px] border-base-content py-3 pr-8 active:bg-base-content active:text-background`}
      onMouseEnter={() => {
        setImageURL(imageURL);
        setIndex(index);
      }}
    >
      <div>
        {date && (
          <div className="flex w-full  justify-end   align-middle">
            <p>{date?.getDay() + "/" + date?.getMonth()}</p>
          </div>
        )}
        <h1 className="flex font-raleway text-[18px] uppercase lg:text-[35px]">
          {name}
        </h1>
        <p className="text-[15px] md:text-xs">{description}</p>
      </div>
    </div>
  );
}
export default WorskhopCard;
