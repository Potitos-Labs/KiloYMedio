import { useState } from "react";
import FavouriteRecipes from "../FavouriteRecipes";
import Allergens from "../../Allergens";
import { Allergen } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { BsFillCaretRightFill } from "react-icons/bs";
import EnrolledWorkshops from "./EnrolledWorkshops";

function CenterItem({
  favoriteUserRecipes,
  allergenList,
  workshopList,
}: {
  favoriteUserRecipes:
    | {
        Recipe: {
          id: string;
          name: string;
          imageURL: string;
        };
      }[]
    | undefined;
  allergenList: Allergen[];
  workshopList:
    | {
        onSiteWorkshop: {
          workshop: {
            name: string;
            description: string;
            imageURL: string;
          };
          workshopId: string;
        };
      }[]
    | undefined;
}) {
  const [recipesVisible, setRecipesVisible] = useState(false);
  const [allergensVisible, setAllergensVisible] = useState(false);
  const [workshopsVisible, setWorkshopsVisible] = useState(false);
  const { data: allergenTransalator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  function hideAllDisplayers() {
    setRecipesVisible(false);
    setAllergensVisible(false);
    setWorkshopsVisible(false);
  }
  return (
    <div className="relative mt-3 overflow-hidden rounded-md border-[1px] border-neutral">
      {/* RECIPES */}
      <div
        className={` ${
          recipesVisible && "bg-primary font-satoshiBold text-base-100"
        } relative flex cursor-pointer items-center border-b-[1px] border-neutral py-[20px]  px-4 text-[20px]  active:bg-primary active:font-satoshiBold active:text-base-100`}
        onClick={() => {
          hideAllDisplayers();
          if (!recipesVisible) {
            setRecipesVisible(true);
          }
        }}
      >
        recetas guardadas
        <div className="absolute bottom-7 right-4">
          <BsFillCaretRightFill
            className={`${
              recipesVisible && " rotate-90"
            } origin-left  transition-transform  `}
          />
        </div>
      </div>
      <div
        className={`${
          recipesVisible &&
          favoriteUserRecipes &&
          favoriteUserRecipes?.length > 0
            ? " flex flex-col space-y-1 bg-neutral p-1"
            : "hidden"
        } `}
      >
        {favoriteUserRecipes &&
          favoriteUserRecipes.map((e) => {
            return (
              <FavouriteRecipes
                key={e.Recipe.id}
                id={e.Recipe.id}
                name={e.Recipe.name}
                image={e.Recipe.imageURL}
              />
            );
          })}
      </div>
      {/* ALERGENOS*/}
      <div
        className={`${
          allergensVisible && "bg-primary font-satoshiBold text-base-100"
        } active:text-base-100" relative cursor-pointer border-b-[1px] border-neutral py-[20px]  px-4 text-[20px]  active:bg-primary active:font-satoshiBold`}
        onClick={() => {
          hideAllDisplayers();
          if (!allergensVisible) {
            setAllergensVisible(true);
          }
        }}
      >
        mis alérgenos
        <div className="absolute bottom-7 right-4">
          <BsFillCaretRightFill
            className={`${
              allergensVisible && "rotate-90"
            } origin-left  transition-transform  `}
          />
        </div>
      </div>

      <div
        className={`${
          allergensVisible && allergenList && allergenList?.length > 0
            ? " grid grid-cols-4 bg-neutral  p-1 "
            : "hidden"
        } `}
      >
        {allergenList.map((allergen) => (
          <div
            className="align-left mx-1 mt-2 mb-1 flex flex-col items-center rounded-md bg-base-100 py-2"
            key={allergen}
          >
            <Allergens allergens={[allergen]} size={40}></Allergens>
            <p className=" inline-block text-center text-[12px] normal-case sm:text-xs">
              {allergenTransalator?.get(allergen)}
            </p>
          </div>
        ))}
      </div>
      {/* PEDIDOS*/}
      <div
        className="border-b-[1px] border-neutral py-[20px]  px-4 text-[20px]  active:border-primary active:bg-primary active:font-satoshiBold active:text-base-100"
        onClick={hideAllDisplayers}
      >
        pedidos
      </div>

      {/*TALLERES*/}
      <div
        className={`${
          workshopsVisible && "bg-primary font-satoshiBold text-base-100"
        } relative cursor-pointer py-[20px]  px-4 text-[20px] active:bg-primary active:font-satoshiBold active:text-base-100`}
        onClick={() => {
          hideAllDisplayers();
          if (!workshopsVisible) {
            setWorkshopsVisible(true);
          }
        }}
      >
        mis talleres
        <div className="absolute bottom-7 right-4">
          <BsFillCaretRightFill
            className={`${
              workshopsVisible && "rotate-90"
            } origin-left  transition-transform  `}
          />
        </div>
      </div>
      <div
        className={`${
          workshopsVisible && workshopList && workshopList?.length > 0
            ? " flex flex-col space-y-1 bg-neutral p-1 "
            : "hidden"
        } `}
      >
        {workshopList &&
          workshopList.map((e) => {
            return (
              <EnrolledWorkshops
                key={e.onSiteWorkshop.workshopId}
                name={e.onSiteWorkshop.workshop.name}
                description={e.onSiteWorkshop.workshop.description}
                image={e.onSiteWorkshop.workshop.imageURL}
                id={e.onSiteWorkshop.workshopId}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CenterItem;
