import { Dispatch, SetStateAction } from "react";

function HalfRating({
  setRating,
}: {
  setRating: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="rating rating-half mt-1 mb-4">
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-1 mask-star bg-accent"
        onClick={() => setRating(0.5)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-2 mask-star bg-accent"
        onClick={() => setRating(1)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-1 mask-star bg-accent"
        onClick={() => setRating(1.5)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-2 mask-star bg-accent"
        onClick={() => setRating(2)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-1 mask-star bg-accent"
        onClick={() => setRating(2.5)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-2 mask-star bg-accent"
        onClick={() => setRating(3)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-1 mask-star bg-accent"
        onClick={() => setRating(3.5)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-2 mask-star bg-accent"
        onClick={() => setRating(4)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-1 mask-star bg-accent"
        onClick={() => setRating(4.5)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-half-2 mask-star bg-accent"
        onClick={() => setRating(5)}
      />
    </div>
  );
}

export default HalfRating;
