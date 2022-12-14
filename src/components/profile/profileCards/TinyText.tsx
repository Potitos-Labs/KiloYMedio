function TinyText({ text, percentage }: { text: string; percentage: string }) {
  return (
    <div className="grid grid-cols-[75%_25%] gap-2 overflow-hidden rounded-md border-[1px] border-neutral p-3 align-middle sm:gap-3 sm:p-[18px] lg:py-10 ">
      <div className=" mb-2 text-[18px] ">
        <p className="text-justify">{text}</p>
      </div>
      <div className="relative mr-2 flex items-center font-satoshiBold text-[20px]">
        <p className="absolute bottom-0 w-full text-right">{percentage}</p>
      </div>
    </div>
  );
}

export default TinyText;
