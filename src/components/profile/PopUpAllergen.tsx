import { Allergen } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import Popup from "reactjs-popup";
import { z } from "zod";

import { trpc } from "../../utils/trpc";
import AllergensComponent from "../Allergens";

export function PopUpAllergen({
  open,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const { data: clientAllergen } = trpc.user.getAllClientAllergen.useQuery();
  const clientAllergenList = clientAllergen?.map((e) => e.allergen) ?? [];

  const allergensList: Allergen[] =
    clientAllergen?.map((clientAllergen) => clientAllergen.allergen) ?? [];

  const allergensHandler = (value: string) => {
    const allergen = z.nativeEnum(Allergen).parse(value);
    const index = allergensList.indexOf(allergen);
    if (index != -1) allergensList.splice(index, 1);
    else allergensList.push(allergen);
  };

  const { data } = trpc.product.getAllAllergensInSpanish.useQuery();
  const AllallergenList = data?.map((e) => e.allergen) ?? [];

  const { data: allergenTranslator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.user.client.updateAllergen.useMutation({
    onSuccess() {
      utils.user.getAllClientAllergen.invalidate();
    },
  });

  function closeAndSavePopUp() {
    setOpen(false);
    mutateAsync({ allergen: allergensList });
  }
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
        onClose={closeAndSavePopUp}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className=" w-11/12 rounded-md bg-white sm:w-2/5">
            <h1 className="w-full rounded-t-md bg-button py-2 text-center text-lg font-bold text-white">
              Alérgenos
            </h1>
            <div className="scrollbar-hide inset-1/3 h-72 overflow-hidden overflow-y-scroll rounded-md  shadow-kym4 backdrop-blur-sm">
              <div className="w-full bg-white ">
                <div className=" grid-cols items-left grid p-5">
                  {AllallergenList.map((allergen) => (
                    <div
                      className=" grid grid-cols-[10%_85%_5%] py-2"
                      key={allergen}
                    >
                      <AllergensComponent
                        allergens={[allergen]}
                        size={25}
                      ></AllergensComponent>
                      <label key={allergen}>
                        {allergenTranslator?.get(allergen)}
                        <input
                          className="form-check-input float-right mt-1 mr-2 h-4 w-4 cursor-pointer rounded-sm border border-gray-500 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none focus:ring-2"
                          type="checkbox"
                          value={allergen}
                          id="flexCheckChecked"
                          defaultChecked={clientAllergenList.includes(allergen)}
                          onChange={(e) => allergensHandler(e.target.value)}
                        ></input>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-left">
                <button
                  className="m-3 mt-5 rounded-md border border-button bg-transparent px-3 hover:border-transparent hover:bg-button_hover hover:text-white"
                  onClick={closePopUp}
                >
                  Cancelar
                </button>
              </div>
              <div className="text-right">
                <button
                  className=" m-3 mt-5 rounded-md border border-button bg-transparent px-3 hover:border-transparent hover:bg-button_hover hover:text-white"
                  onClick={closeAndSavePopUp}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}
