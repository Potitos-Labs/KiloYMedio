import { Allergen } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import Popup from "reactjs-popup";
import { z } from "zod";

import { trpc } from "../utils/trpc";
import AllergensComponent from "./Allergen";

export function PopUpAllergen({
  open,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const allergensList: { allergen: Allergen }[] = [];

  const allergensHandler = (value: string) => {
    const allergen = z.nativeEnum(Allergen).parse(value);
    const index = allergensList.findIndex((obj) => obj.allergen == allergen);
    if (index != -1) allergensList.splice(index, 1);
    else allergensList.push({ allergen });
  };

  //const utils = trpc.useContext();

  const { data } = trpc.product.getAllAllergensInSpanish.useQuery();
  const allergenList = data?.map((e) => e.allergen) ?? [];

  const { data: allergenTranslator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  const { data: clientAllergen } = trpc.user.getAllClientAllergen.useQuery();
  const clientAllergenList =
    clientAllergen?.map((clientAllergen) => clientAllergen.allergen) ?? [];

  // const updateMutation = trpc.user.client.updateAllergen.useMutation({
  //   onSuccess() {
  //     utils.user.getAllClientAllergen.invalidate();
  //   },
  // });

  function closePopUp() {
    setOpen(false);
    //updateMutation.mutateAsync({allergensList}: {allergensList:  });
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
                  className=" grid-cols-[10%_50%_20%_20%] grid py-2"
                  key={allergen}
                >
                  <AllergensComponent
                    allergens={[allergen]}
                    size={25}
                  ></AllergensComponent>
                  <label key={allergen}>
                    {allergenTranslator?.get(allergen)}
                    <input
                      className="form-check-input appearance-none h-4 w-4 border border-gray-500 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-right mr-2 cursor-pointer"
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
