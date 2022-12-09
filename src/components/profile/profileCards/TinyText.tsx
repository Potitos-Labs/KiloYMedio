function TinyText({ text, percentage }: { text: string; percentage: string }) {
  return (
    <div className="grid grid-cols-[80%_20%] gap-4 overflow-hidden rounded-md border-[1px] border-neutral p-6 align-middle ">
      <div className=" mb-2 text-[18px] ">
        <p className="text-justify">{text}</p>
      </div>
      <div className="relative mr-2 flex items-center font-satoshiBold text-[24px]">
        <p className="absolute bottom-0 w-full text-right">{percentage}</p>
      </div>
    </div>
  );
}

export default TinyText;
