import Stars from "../../Stars";

function Comment({
  user,
  description,
  rating,
  date,
}: {
  user: string;
  description: string;
  rating: number;
  date: Date;
}) {
  return (
    <div>
      <div className="w-[550px] rounded-lg bg-white p-8">
        <p className="mb-2 font-satoshiBold">{user}</p>
        <p className="mb-10 text-justify">{description}</p>
        <div className="flex justify-between">
          <Stars average={rating}></Stars>
          <p>{date.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
