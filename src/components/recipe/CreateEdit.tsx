import ProductSearchBar from "@components/recipe/ProductSearchBar";
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ListboxDesign from "../../components/ui/ListboxDesign";
import { trpc } from "../../utils/trpc";
import {
  ICreateRecipe,
  IUpdateRecipe,
  createRecipeSchema,
} from "../../utils/validations/recipe";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Allergen, IngredientUnit, RecipeDifficulty } from "@prisma/client";
import TimeSpanForm from "@components/ui/TimeSpanForm";
import Layout from "@components/Layout";
import IncDecButtons from "@components/ui/IncDecButtons";
import { UploadImageRecipe } from "@components/ui/UploadImageRecipe";
import { FaTimes } from "react-icons/fa";
import DropdownCheckAllergen from "@components/ui/dropdownCheckAllergen";
import { useState } from "react";
import { z } from "zod";
import { AllergenComponent } from "../Allergens";

const defaultRecipe: ICreateRecipe = {
  cookingTime: { hour: 0, minute: 1 },
  preparationTime: { hour: 0, minute: 1 },
  portions: 1,
  ingredients: [{ name: "", amount: 1, unit: "tablespoon" }],
  directions: [{ direction: "", index: 0 }],
  description: "",
  difficulty: "easy",
  imageURL: "",
  name: "",
};

export default function CreateEdit(props: {
  units: Record<IngredientUnit, string>;
  recipe?: IUpdateRecipe;
}) {
  const { units, recipe = defaultRecipe } = props;
  const { mutateAsync: createMutation } = trpc.recipe.create.useMutation();
  const { mutateAsync: updateMutation } = trpc.recipe.update.useMutation();

  async function onSubmit(recipe: ICreateRecipe) {
    if (!!props.recipe) {
      // If we are editing a recipe
      await updateMutation({ ...recipe, id: props.recipe.id });
    } else {
      await createMutation(recipe);
    }
    router.push("/recipe");
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ICreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
    criteriaMode: "all",
    defaultValues: recipe,
  });

  const { data: allergensFromProducts } =
    trpc.product.getAlergensFromProduct.useQuery(
      getValues("ingredients").map((i) => ({ productName: i.name })),
    );
  console.log(watch());

  const {
    fields: fieldsIngredients,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: fieldsDirections,
    append: appendDirections,
    remove: removeDirections,
  } = useFieldArray({
    control,
    name: "directions",
  });

  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const [listRef2] = useAutoAnimate<HTMLDivElement>();

  const buttonText = props.recipe ? "Guardar" : "Crear receta";

  const difficultyOptions: Record<RecipeDifficulty, string> = {
    easy: "Fácil",
    moderate: "Medio",
    hard: "Difícil",
  };

  const { data: allergens } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  const [allergensList, setAllergensList] = useState<{ allergen: Allergen }[]>(
    [],
  );

  const allergensHandler = (value: string) => {
    const allergen = z.nativeEnum(Allergen).parse(value);
    const index = allergensList.findIndex((obj) => obj.allergen == allergen);
    if (index != -1) allergensList.splice(index, 1);
    else allergensList.push({ allergen });
    setAllergensList(allergensList);
    return allergensList;
  };

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="mt-[50px] ml-[20px] max-w-[769px] font-raleway text-[45px] md:ml-[80px] md:text-xl">
        COMPARTE TU RECETA EN UNOS SENCILLOS PASOS
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-12 ml-[20px] md:ml-[80px]">
          {/*Details*/}
          <section className="grid grid-cols-1 gap-8 xl:grid-cols-[50%_50%]">
            <div className="grid grid-cols-1">
              <section className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex flex-col gap-[30px]">
                  <div className="font-raleway text-lg">
                    PONLE NOMBRE A TU RECETA
                  </div>
                  <input
                    className="input input-bordered mr-[50px] h-[60px] rounded-[30px] border-base-300 text-sm text-base-300"
                    type="text"
                    placeholder="Título"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="flex text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* Title End*/}
                {/* Info */}
                <div className="mt-8 font-raleway text-lg">
                  TIEMPO Y PORCIONES
                </div>
                <div className="grid auto-cols-auto grid-cols-[45%-55%] grid-rows-[35%-35%-15%-15%] gap-y-[20px] gap-x-[10px] text-start md:grid-cols-[30%_35%_35%] md:grid-rows-4">
                  {/* Grid Row 1: Preparation time */}
                  <div className="col-start-1 row-start-1 self-start pt-3 text-lg md:self-center md:pt-0">
                    Tiempo de preparación:
                  </div>
                  <div className="col-start-2 row-start-1 self-center text-lg md:col-span-2">
                    <TimeSpanForm control={control} label={"preparationTime"} />
                    {errors.preparationTime && (
                      <p className="flex text-sm text-red-500">
                        {errors.preparationTime?.minute?.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 1: Preparation time */}

                  {/* Grid Row 2: Cooking time */}
                  <div className="col-start-1 row-start-2 self-start pt-3 text-lg md:self-center md:pt-0">
                    Tiempo de cocinado:
                  </div>
                  <div className="col-span-2 col-start-2 row-start-2 self-center text-lg">
                    <TimeSpanForm control={control} label={"cookingTime"} />
                    {errors.cookingTime && (
                      <p className="flex text-sm text-red-500">
                        {errors.cookingTime?.minute?.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 2: Cooking time */}

                  {/* Grid Row 3: Portions */}
                  <div className="col-start-1 row-start-3 self-center text-lg">
                    Porciones:
                  </div>
                  <div className="col-start-2 row-start-3 flex flex-row items-center gap-2 self-center text-lg">
                    <Controller
                      name="portions"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <IncDecButtons
                          setAmount={onChange}
                          amount={value}
                          max={15}
                          unit="pers"
                          className="h-[60px] w-[150px] rounded-[30px] border-[1px] border-base-300"
                          onBlur={onBlur}
                        ></IncDecButtons>
                      )}
                    ></Controller>
                    <p className="text-lg"> pers</p>
                    {errors.portions && (
                      <p className="flex text-sm text-red-500">
                        {errors.portions.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 3: Portions */}

                  {/* Grid Row 4: Difficulty */}
                  <div className="col-start-1 row-start-4 self-center text-lg">
                    Dificultad:
                  </div>
                  <div className="col-start-2 row-start-4 text-sm">
                    <Controller
                      name={`difficulty`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <ListboxDesign
                          onChange={onChange}
                          value={value}
                          list={difficultyOptions}
                          order="normal"
                        ></ListboxDesign>
                      )}
                    ></Controller>
                  </div>

                  {/* End Grid Row 4: Difficulty */}
                </div>
              </section>
            </div>
            {/* Image */}
            <div className="grid-cols col-start-1 grid xl:col-start-2">
              <div className="font-raleway text-lg">AÑADE UNA FOTO</div>
              <div className="mt-[35px] text-center">
                <Controller
                  name="imageURL"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <div>
                        <UploadImageRecipe
                          setImageURL={onChange}
                          value={value}
                        />
                      </div>
                    </>
                  )}
                ></Controller>
                {errors.imageURL && (
                  <p className="flex text-sm text-red-500">
                    {errors.imageURL?.message}
                  </p>
                )}
              </div>
            </div>
            {/* Image End */}
          </section>
          {/*End Details*/}

          {/*Recipe*/}
          <section className="mt-8 flex flex-col gap-6">
            {/* Description */}
            <div className="flex max-w-[700px] flex-col gap-[30px]">
              <div className="font-raleway text-lg">DESCRIPCIÓN</div>
              <textarea
                className="textarea textarea-bordered mr-5 h-[120px] rounded-[30px] border-base-300 text-sm leading-[30px] text-base-300"
                {...register("description", {})}
              />
              {errors.name && (
                <p className="flex text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Description End*/}

            {/* Ingredients */}
            <div className="w-full gap-2">
              <div>
                <div className="mb-[20px] mt-8 font-raleway text-lg">
                  AÑADE INGREDIENTES
                </div>

                <div className="flex flex-col gap-3" ref={listRef}>
                  {fieldsIngredients.map((field, index) => {
                    return (
                      <div key={field.id}>
                        <section className="section flex flex-col gap-3 sm:flex-row">
                          <div className="mr-5 flex sm:mr-0">
                            <Controller
                              name={`ingredients.${index}.name`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <ProductSearchBar
                                  value={value}
                                  setValue={onChange}
                                ></ProductSearchBar>
                              )}
                            ></Controller>
                            {errors.ingredients?.[index] && (
                              <p className="flex text-sm text-red-500">
                                {errors.ingredients?.[index]?.name?.message}
                              </p>
                            )}
                          </div>
                          <div className="flex text-lg text-neutral">
                            <Controller
                              name={`ingredients.${index}.amount`}
                              control={control}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <IncDecButtons
                                  setAmount={onChange}
                                  amount={value}
                                  max={999}
                                  unit="other"
                                  className="h-[60px] w-[150px] rounded-[30px] border-[1px] border-base-300"
                                  onBlur={onBlur}
                                ></IncDecButtons>
                              )}
                            ></Controller>
                            {errors.ingredients?.[index] && (
                              <p className="flex text-sm text-red-500">
                                {errors.ingredients?.[index]?.amount?.message}
                              </p>
                            )}
                          </div>
                          <div className="flex text-sm">
                            <Controller
                              name={`ingredients.${index}.unit`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <ListboxDesign
                                  onChange={onChange}
                                  value={value}
                                  list={units}
                                ></ListboxDesign>
                              )}
                            ></Controller>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeIngredients(index)}
                          >
                            <FaTimes className="text-[35px] text-red-600"></FaTimes>
                          </button>
                        </section>
                      </div>
                    );
                  })}
                </div>
                <p className="flex text-sm text-red-500">
                  {errors.ingredients?.message}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    appendIngredients({
                      name: "",
                      amount: 1,
                      unit: "tablespoon",
                    })
                  }
                  className="inline-flex items-center gap-2 pt-4"
                >
                  <label className="h-[40px] w-[40px] rounded-full border-none bg-[#AEAAA6] pt-0.5 text-[35px] leading-none text-base-100 hover:cursor-pointer">
                    +
                  </label>
                  <label className="text-lg hover:cursor-pointer">
                    Añadir ingrediente
                  </label>
                </button>
              </div>
            </div>
            {/* Ingredients End*/}

            {/* Directions */}
            <div>
              <div className="mb-[30px] mt-8 font-raleway text-lg">
                AÑADE PASOS
              </div>

              <div className="mr-5 flex flex-col gap-3 sm:mr-0" ref={listRef2}>
                {fieldsDirections.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section className="section flex w-full gap-3">
                        <div className="items-center text-sm">
                          {index + 1 + "."}
                        </div>
                        <div className="flex w-[570px] flex-col justify-center">
                          <textarea
                            placeholder="Paso"
                            className="textarea textarea-bordered h-[110px] rounded-[30px] border-base-300 text-sm leading-[30px] text-base-300"
                            {...register(`directions.${index}.direction`)}
                          />
                          {errors.directions?.[index] && (
                            <p className="flex text-sm text-red-500">
                              {errors.directions?.[index]?.direction?.message}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDirections(index)}
                        >
                          <FaTimes className="text-[35px] text-red-600"></FaTimes>
                        </button>
                      </section>
                    </div>
                  );
                })}
              </div>
              <p className="flex text-sm text-red-500">
                {errors.directions?.message}
              </p>
              <button
                type="button"
                onClick={() =>
                  appendDirections({
                    direction: "",
                    index: 0,
                  })
                }
                className="inline-flex items-center gap-2 pt-4"
              >
                <label className="h-[40px] w-[40px] rounded-full border-none bg-[#AEAAA6] pt-0.5 text-[35px] leading-none text-base-100 hover:cursor-pointer">
                  +
                </label>
                <label className="text-lg hover:cursor-pointer">
                  Añadir paso
                </label>
              </button>
            </div>
            {/* Directions End*/}
          </section>
          <section className="flex flex-col gap-3">
            {/* Allergens */}
            <div>
              <div className="mt-8 mb-[20px] font-raleway text-lg">
                ¿TU RECETA CONTIENE ALÉRGENOS?
              </div>
              <div className="flex text-sm">
                {allergens && allergensFromProducts && (
                  <Controller
                    name={"allergens"}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <DropdownCheckAllergen
                        allergens={allergens}
                        handler={allergensHandler}
                        productAllergens={allergensFromProducts}
                        onChange={onChange}
                      ></DropdownCheckAllergen>
                    )}
                  ></Controller>
                )}
              </div>
              <div>
                {allergensList.map((allergen) => (
                  <div
                    className="mt-2 flex py-2 align-middle"
                    key={allergen.allergen}
                  >
                    <AllergenComponent allergen={allergen.allergen} size={30} />
                  </div>
                ))}
              </div>
              {/* <div className="text-sm text-red-500">
                Si alguien sabe hacer un dropdown con checks, please send help
              </div> */}
            </div>
            {/* End Allergens */}
          </section>
          {/*End Recipe*/}
          {/* Button */}
          <div className="flex flex-col-reverse gap-5 pb-6 md:flex-row">
            <button
              className="btn flex h-[60px] w-[220px] rounded-[30px] bg-transparent font-raleway text-sm hover:bg-transparent md:mt-6"
              type="button"
              onClick={() => router.push("/recipe")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn mt-6 flex h-[60px] w-[220px] rounded-[30px] font-raleway text-sm text-base-100"
            >
              {buttonText}
            </button>
          </div>
          {/* Button End */}
        </div>
      </form>
    </Layout>
  );
}
