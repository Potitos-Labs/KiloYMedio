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
  const { data: categories } = trpc.product.getAllCategories.useQuery();
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
            className="bold absolute top-[18px] left-14 flex rounded-full  bg-base-content px-3 text-base-100  "
            onClick={closePopUp}
          >
            <BsX className="bold mt-[3px] mr-2 h-5 w-5 fill-base-100" />
            cerrar
          </button>
          <div className=" h-fill mx-4  grid h-5/6 w-full grid-cols-2 gap-3 rounded-md bg-base-100 py-6 px-2 sm:px-4 sm:py-12 md:gap-8 lg:grid-cols-3">
            {categories &&
              supraCategories?.map((sc, index) => (
                <CategoryCards
                  key={index}
                  name={sc.supraCategoryName}
                  relations={sc.SupraCategoryRelation.map((cat) => ({
                    category: cat.category,
                    text: categories.inSpanish[cat.category],
                  }))}
                  closePopUp={closePopUp}
                />
              ))}
            <div className="flex items-end justify-end justify-items-end">
              <button
                className=" rounded-md border-[1px] border-base-content px-5 py-1 font-raleway text-base-content "
                onClick={() => {
                  router.push("/product?supracategory=all");
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
