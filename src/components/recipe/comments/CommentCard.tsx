import Stars from "../../Stars";
import Image from "next/image";

function CommentCard({
  imageURL,
  user,
  description,
  rating,
  date,
}: {
  imageURL: string;
  user: string;
  description: string;
  rating: number;
  date: Date;
}) {
  return (
    <div>
      <div className="-mx-20 w-[320px] rounded-lg bg-white p-6 sm:-mx-40 sm:w-[650px] md:mx-0 md:w-[700px] lg:w-[480px] xl:w-[580px]">
        <div className="mb-4 flex select-none items-center gap-4">
          <Image
            src={imageURL}
            alt=""
            className="rounded-full"
            width={40}
            height={40}
            objectFit="contain"
          />
          <p className="font-satoshiBold uppercase">{user}</p>
        </div>
        <p className="mb-10 text-justify">{description}</p>
        <div className="flex justify-between">
          <Stars average={rating}></Stars>
          <p>{date.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
