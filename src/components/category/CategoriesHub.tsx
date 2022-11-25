import { trpc } from "../../utils/trpc";
import Popup from "reactjs-popup";
import CategoryCards from "./CategoryCards";
import { BsX } from "react-icons/bs";
import router from "next/router";
import { Dispatch, SetStateAction } from "react";

function CategoriesHub({
  open,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const { data: supraCategories } =
    trpc.product.getAllSupraCategories.useQuery();
  function closePopUp() {
    setOpen(false);
  }
  return (
    <div>
      <Popup
        open={open}
        lockScroll
        modal
        closeOnDocumentClick
        onClose={closePopUp}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 ">
          <button
            className="absolute top-[18px] left-14 flex rounded-full  bg-base-content px-3    text-base-100  "
            onClick={closePopUp}
          >
            <BsX className="mt-[3px] mr-2 h-5 w-5  fill-base-100" />
            cerrar
          </button>
          <div className=" h-fill mx-4  grid h-5/6 w-full grid-cols-3 gap-8 rounded-md bg-base-100 py-12 px-4">
            {supraCategories?.map((sc, index) => (
              <CategoryCards
                key={index}
                name={sc.supraCategoryName}
                relations={sc.SupraCategoryRelation}
                closePopUp={closePopUp}
              ></CategoryCards>
            ))}
            <div className="flex items-end justify-end justify-items-end">
              <button
                className=" rounded-md border-[1px] border-base-content px-5 py-1 font-raleway text-base-content "
                onClick={() => {
                  router.push("/product");
                  setOpen(false);
                }}
              >
                VER TODO
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default CategoriesHub;
