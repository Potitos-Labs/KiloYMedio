import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface HeartProps {
  id: string;
  favorite: boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const Heart = ({ id, favorite, addFavorite, removeFavorite }: HeartProps) => {
  const [isFavorite, setFavorite] = useState(favorite);

  function changeFavorite() {
    !isFavorite ? addFavorite(id) : removeFavorite(id);
    setFavorite(!favorite);
  }

  return (
    <div>
      <div className="dropdown relative  flex h-8 w-6 items-center">
        {isFavorite ? (
          <FaHeart onClick={() => changeFavorite()} />
        ) : (
          <FaRegHeart onClick={() => changeFavorite()} />
        )}
      </div>
    </div>
  );
};

export default Heart;
