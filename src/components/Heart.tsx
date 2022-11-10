import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Popup from "reactjs-popup";

interface HeartProps {
  id: string;
  name: string;
  favorite: boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const Heart = ({
  id,
  name,
  favorite,
  addFavorite,
  removeFavorite,
}: HeartProps) => {
  const [open, setOpen] = useState(false);
  const [isFavorite, setFavorite] = useState(favorite);

  function cancelHandler() {
    setOpen(false);
  }

  function AcceptHandler() {
    setOpen(false);
    setFavorite(!isFavorite);
    removeFavorite(id);
  }

  function confirmAction() {
    setOpen(true);
  }

  function changeFavorite() {
    !isFavorite ? addFavorite(id) : confirmAction();
    !isFavorite && setFavorite(!isFavorite);
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

      <Popup open={open} modal closeOnDocumentClick onClose={cancelHandler}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="w-11/12 rounded-md bg-white sm:w-2/5">
            <h1 className="rounded-t-md bg-red-500 py-2 text-center text-lg font-bold text-white">
              Eliminar de favoritos
            </h1>
            <p className="m-3">
              <span className="font-bold">¡Atención!</span>
            </p>
            <p className="m-3 text-justify">
              Estás apunto de eliminar la receta
              <span className="font-medium italic">{name}</span> de sus
              favoritos.
            </p>
            <p className="m-3 mt-4 text-center">
              ¿Estás seguro de que quieres continuar?
            </p>
            <div className="mb-3 mr-3 flex justify-end ">
              <button
                className="  mt-3 rounded-md bg-button p-1 text-white hover:bg-button_hover sm:mt-5  sm:py-1 sm:px-2"
                onClick={AcceptHandler}
              >
                Confirmar
              </button>
              <button
                className=" ml-3 mt-3 rounded-md border  border-button bg-transparent px-1 hover:border-transparent hover:bg-button_hover hover:text-white  sm:mt-5 sm:px-3"
                onClick={cancelHandler}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Heart;
