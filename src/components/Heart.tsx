import { IoBookmark } from "react-icons/io5";

interface HeartProps {
  id: string;
  removeFavorite: (id: string) => void;
}

const Heart = ({ id, removeFavorite }: HeartProps) => {
  function changeFavorite() {
    removeFavorite(id);
  }

  return (
    <div className="m-[2px] mt-2 flex justify-end sm:m-2">
      <button className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-base-content bg-opacity-80 text-base-100 hover:bg-opacity-100">
        <IoBookmark
          onClick={() => {
            changeFavorite();
          }}
        />
      </button>
    </div>
  );
};

export default Heart;
