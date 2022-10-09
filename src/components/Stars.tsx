import { number } from "zod";

const num = 4.5;
const stars = [0, 0, 0, 0, 0];

const Stars = ({ average }: { average: number }) => {
  return (
    <div>
      {fromIntToArray(average).map((number) => (
        <p>{number}</p>
      ))}
    </div>
  );
};

function fromIntToArray(num: number) {
  for (let i = 0; i < 5; i++) {
    if (num >= 1) {
      stars[i] = 1;
    } else {
      if (num != 0) {
        stars[i] = num;
      }
    }
    num--;
  }
  return stars;
}

export default Stars;
