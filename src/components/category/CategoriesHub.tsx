//import { trpc } from "../../utils/trpc";
import Popup from "reactjs-popup";
import CategoryCards from "./CategoryCards";
import { BsX } from "react-icons/bs";
function CategoriesHub() {
  /*
  const { data: categories } = trpc.product.getAllCategories.useQuery();

  let eCategories;
  let nCategories;
  if (categories) {
    eCategories = categories.eCategories;
    nCategories = categories.neCategories;
  }

  function closeAndSavePopUp() {
    // setOpen(false);
    //mutateAsync({ allergen: allergensList });
  }
  function closePopUp() {
    // setOpen(false);
  }
  */
  return (
    <div>
      <Popup open={true} lockScroll modal closeOnDocumentClick>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 ">
          <button className="absolute top-4 left-8 flex rounded-full  bg-base-content px-5 py-1  text-base-100  ">
            <BsX className="mt-[3px] mr-2 h-5 w-5  fill-base-100" />
            cerrar
          </button>
          <div className=" h-fill mx-4  grid h-5/6 w-full grid-cols-3 gap-8 rounded-md bg-base-100 py-12 px-4">
            <CategoryCards />
            <CategoryCards />
            <CategoryCards />
            <CategoryCards />
            <CategoryCards />
            <CategoryCards />
            <CategoryCards />
            <CategoryCards />
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default CategoriesHub;
