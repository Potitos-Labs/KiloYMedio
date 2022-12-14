import { trpc } from "../../utils/trpc";
import Popup from "reactjs-popup";
import CategoryCards from "./CategoryCards";
import { BsX } from "react-icons/bs";
import router from "next/router";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
            className="bold absolute top-[25px] left-[56px]  flex rounded-full  bg-base-content px-[11px] text-base-100  "
            onClick={closePopUp}
          >
            <BsX className="bold mt-[3px] mr-2 h-5 w-5 fill-base-100" />
            cerrar
          </button>
          <AnimatePresence>
            {categories && (
              <motion.div
                initial={{ opacity: 0, y: -1000 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.1,
                    type: "spring",
                    damping: 35,
                    stiffness: 400,
                  },
                }}
                exit={{ opacity: 0, y: -1000 }}
                className="h-fill mx-4 grid h-[83%] w-full grid-cols-2 gap-3 rounded-md bg-base-100 py-6 px-2 sm:px-4 sm:py-12 md:gap-8 lg:h-[81.50%] lg:grid-cols-3"
              >
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
                <div className="flex items-end justify-end justify-items-end lg:col-span-2">
                  <button
                    className=" rounded-md border-[1px] border-base-content px-5 py-1 font-raleway text-base-content "
                    onClick={() => {
                      router.push("/product?category=all");
                      setOpen(false);
                    }}
                  >
                    VER TODO
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Popup>
    </div>
  );
}

export default CategoriesHub;
