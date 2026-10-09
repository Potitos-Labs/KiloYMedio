import Image from "@components/ui/Image";
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="pb-64 pl-64">
          <Image
            className="pl-9"
            src={"/api/images/site/961ca5a2-8d2a-9cd2-5313-d4469b2d0314.webp"}
            width={471}
            height={450}
            alt="cargando..."
          ></Image>
        </div>
      </div>
    </Popup>
  );
}
