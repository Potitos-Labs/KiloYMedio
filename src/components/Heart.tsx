import { FaRegHeart, FaHeart } from "react-icons/fa";

interface HeartProps {
  id: string;
  favorite: boolean | undefined;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const Heart = ({ id, favorite, addFavorite, removeFavorite }: HeartProps) => {
  function changeFavorite() {
    !favorite ? addFavorite(id) : removeFavorite(id);
  }

  return (
    <div>
      <div className="dropdown relative flex h-8 w-6 cursor-pointer items-center">
        {favorite ? (
          <FaHeart
            className="text-violet-800"
            onClick={() => changeFavorite()}
          />
        ) : (
          <FaRegHeart
            className="text-violet-800"
            onClick={() => changeFavorite()}
          />
        )}
      </div>
    </div>
  );
};

export default Heart;
