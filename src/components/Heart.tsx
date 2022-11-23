import { useState } from "react";
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

  const [color, setColor] = useState(favorite);

  return (
    <div>
      <div className="dropdown relative flex h-8 w-6 cursor-pointer items-center">
        {color ? (
          <FaHeart
            color="purple"
            onClick={() => {
              setColor(false);
              changeFavorite();
            }}
          />
        ) : (
          <FaRegHeart
            color="purple"
            onClick={() => {
              setColor(true);
              changeFavorite();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Heart;
