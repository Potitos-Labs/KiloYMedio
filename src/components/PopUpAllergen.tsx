//import { Allergen } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import Popup from "reactjs-popup";

import { trpc } from "../utils/trpc";
import AllergensComponent from "./Allergen";

export function PopUpAllergen({
  open,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  //const utils = trpc.useContext();

  const { data } = trpc.product.getAllAllergensInSpanish.useQuery();
  const allergenList = data?.map((e) => e.allergen) ?? [];

  const { data: allergenTranslator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  // const { data: allergens } = trpc.user.getAllClientAllergen.useQuery();
  // const clientAllergenList =
  //   allergens?.map((clientAllergen) => clientAllergen.allergen) ?? [];

  // const addMutation = trpc.user.addAllergen.useMutation({
  //   onSuccess() {
  //     utils.user.getAllClientAllergen.invalidate();
  //   },
  // });

  // const deleteMutation = trpc.user.deleteAllergen.useMutation({
  //   onSuccess() {
  //     utils.user.getAllClientAllergen.invalidate();
  //   },
  // });

  // const allergen = Allergen.fish;

  // function addAllergen() {
  //   addMutation.mutateAsync({ allergen: allergen });
  // }

  // function deleteAllergen() {
  //   deleteMutation.mutateAsync({ allergen: allergen });
  // }

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
        <div className=" overflow-y-scroll rounded-md shadow-lg shadow-kym4 backdrop-blur-sm  fixed inset-1/3">
          <div className="bg-white ">
            <h1 className="w-full bg-button py-2 text-center text-lg font-bold text-white">
              Alérgenos
            </h1>
            <div className=" p-10 grid-cols items-left grid">
              {allergenList.map((allergen) => (
                <div
                  className="align-left grid-cols-[10%_90%] mt-2 grid py-2"
                  key={allergen}
                >
                  <AllergensComponent
                    allergens={[allergen]}
                    size={25}
                  ></AllergensComponent>
                  <p>{allergenTranslator?.get(allergen)}</p>

                  <hr className="border-1 mt-5 border-gray-200 pb-3"></hr>
                </div>
              ))}
            </div>
            <div className="text-right">
              <button
                className="m-3 mt-5 rounded-md border border-button bg-transparent px-3 hover:border-transparent hover:bg-button_hover hover:text-white"
                onClick={closePopUp}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}
