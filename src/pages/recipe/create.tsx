import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";

import Layout from "../../components/Layout";
import IncDecRecipe from "../../components/ui/IncDecRecipe";
import ListboxDesign from "../../components/ui/ListboxDesign";
import {
  ICreateRecipe,
  createRecipeSchema,
} from "../../utils/validations/recipe";

const RecipeForm: NextPage = () => {
  //   const { data: allProducts } = trpc.product.getAllProducts.useQuery();
  const { register, control, /* handleSubmit,*/ watch } =
    useForm<ICreateRecipe>({
      resolver: zodResolver(createRecipeSchema),
      defaultValues: {
        timeSpan: { hour: 1, minute: 1 },
        portions: 1,
        ingredients: { amount: 1, unit: "tazas" },
      },
    });

  const units = [
    "tazas",
    "gramos",
    "kilogramos",
    "litros",
    "mililitros",
    "onzas",
    "libras",
    "cucharadas",
    "cucharaditas",
    "unidades",
  ];

  console.log(watch());

  return (
    <Layout>
      <section>
        <div className="mt-12 pl-10">
          {/*Details*/}
          <section className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-2">
              <div className="">Título </div>
              <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Título"
                {...register("name")}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Dificultad </div>
              <div className="flex flex-row gap-2">
                {/* <select {...register("difficulty", { required: true })}>
                <option value="easy">Fácil</option>
                <option value="moderate">Normal</option>
                <option value="hard">Difícil</option>
              </select> */}
                <input {...register("difficulty")} type="radio" value="easy" />
                <p>Baja</p>
                <input
                  {...register("difficulty", {})}
                  type="radio"
                  value="moderate"
                />
                <p>Media</p>
                <input {...register("difficulty")} type="radio" value="hard" />
                <p>Alta</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Duración </div>
              <Controller
                name="timeSpan.hour"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    maxValue={23}
                  ></IncDecRecipe>
                )}
              ></Controller>
              <p>horas</p>
              <Controller
                name="timeSpan.minute"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    maxValue={59}
                  ></IncDecRecipe>
                )}
              ></Controller>
              <p>minutos</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Raciones </div>
              <Controller
                name="portions"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    maxValue={15}
                  ></IncDecRecipe>
                )}
              ></Controller>
            </div>

            <div className="flex flex-row items-center gap-2">
              <button className="border-2 border-black">Añadir imagen</button>
              <button className="border-2 border-black">Cambiar imagen</button>
              {/* <input type="url" placeholder="img" {...register("img", {})} /> */}
            </div>
          </section>
          {/*End Details*/}
          {/*Recipe*/}
          <section>
            <div>
              <div className="text-lg">Descripción </div>
              <textarea
                className="textarea textarea-bordered"
                {...register("description", {})}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Ingredientes </div>
              <input
                type="text"
                placeholder="sdfdsfsefae"
                {...register("ingredients.name", {})}
              />
              <Controller
                name="ingredients.amount"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    maxValue={999}
                  ></IncDecRecipe>
                )}
              ></Controller>
              <Controller
                name="ingredients.unit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ListboxDesign
                    onChange={onChange}
                    value={value}
                    list={units}
                  ></ListboxDesign>
                )}
              ></Controller>

              {/* <select
                className="select select-bordered w-full max-w-xs"
                {...register("ingredients.unit", { required: true })}
              >
                <option value="Mr">Taza</option>
                <option value="Mrs">Gramos</option>
                <option value="Miss">Cucharada</option>
                <option value="Dr">Etc</option>
              </select> */}
            </div>
            <div>
              <div className="text-lg">Pasos </div>
              <textarea
                className="textarea textarea-bordered"
                {...register("directions", {})}
              />
            </div>
          </section>
          {/*End Recipe*/}
        </div>
      </section>
    </Layout>
  );
};

export default RecipeForm;
