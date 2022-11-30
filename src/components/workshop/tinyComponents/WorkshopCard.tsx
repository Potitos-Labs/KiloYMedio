function WorskhopCard({
  name,
  description,
  date,
  imageURL,
  setImageURL,
  index,
  setIndex,
}: {
  name: string;
  description: string;
  date: Date | undefined | null;
  imageURL: string;
  index: number;
  setImageURL: (name: string) => void;
  setIndex: (index: number) => void;
}) {
  console.log(date);
  return (
    <div
      className=" mb-2 block h-[180px] max-h-[230px] w-full cursor-pointer rounded-md border-[1px] border-base-content px-8 py-3 active:bg-base-content active:text-background"
      onMouseEnter={() => {
        setImageURL(imageURL);
        setIndex(index);
      }}
    >
      {date && (
        <div className="flex w-full  justify-end   align-middle">
          <p>{date?.getDay() + "/" + date?.getMonth()}</p>
        </div>
      )}
      <h1 className="flex font-raleway text-base uppercase md:text-[40px]">
        {name}
      </h1>
      <p>{description}</p>
    </div>
  );
}
export default WorskhopCard;
