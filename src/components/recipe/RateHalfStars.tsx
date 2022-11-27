import { Dispatch, SetStateAction } from "react";

function RateHalfStars({
  setRating,
}: {
  setRating: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="rating mt-1 mb-4">
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star bg-accent"
        onClick={() => setRating(1)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star bg-accent"
        onClick={() => setRating(2)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star bg-accent"
        onClick={() => setRating(3)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star bg-accent"
        onClick={() => setRating(4)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star bg-accent"
        onClick={() => setRating(5)}
      />
    </div>
  );
}

export default RateHalfStars;
