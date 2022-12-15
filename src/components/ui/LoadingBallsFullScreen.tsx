import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Popup from "reactjs-popup";

export default function Loading({
  open,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  return (
    <Popup
      open={open}
      lockScroll
      modal
      closeOnDocumentClick
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 ">
        <div className="pl-64 pb-64">
          <Image
            className="pl-9"
            src={"/gif/gif-bolas.gif"}
            width={471}
            height={450}
            alt="cargando..."
          ></Image>
        </div>
      </div>
    </Popup>
  );
}
