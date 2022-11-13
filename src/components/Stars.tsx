import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

const stars = [0, 0, 0, 0, 0];

const Stars = ({ average }: { average: number }) => {
  return (
    <div className=" inline-block items-center">
      {fromIntToArray(average).map((number, index) =>
        fromIntToStar(number, index),
      )}
    </div>
  );
};

function fromIntToStar(num: number, index: number) {
  if (num == 0) {
    return (
      <TiStarOutline
        key={index}
        size={20}
        className="mb-1 inline-block  fill-kym1"
      />
    );
  }
  if (num == 1) {
    return (
      <TiStarFullOutline
        key={index}
        size={20}
        className="mb-1 inline-block  fill-kym1"
      />
    );
  }
  return (
    <TiStarHalfOutline
      key={index}
      size={20}
      className="mb-1 inline-block fill-kym1"
    />
  );
}

function fromIntToArray(num: number) {
  for (let i = 0; i < 5; i++) {
    if (num >= 1) {
      stars[i] = 1;
      num--;
    } else {
      if (num < 1) {
        stars[i] = num;
        break;
      }
    }
  }
  return stars;
}

export default Stars;
