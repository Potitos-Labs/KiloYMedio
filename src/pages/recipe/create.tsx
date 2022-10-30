import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

import Layout from "../../components/Layout";
import {
  ICreateRecipe,
  createRecipeSchema,
} from "../../utils/validations/recipe";

// import { RecipeDifficulty } from "@prisma/client";
// import { trpc } from "../../utils/trpc";

const RecipeForm: NextPage = () => {
  //   const { data: allProducts } = trpc.product.getAllProducts.useQuery();
  const { register, /*setValue, handleSubmit,*/ watch } =
    useForm<ICreateRecipe>({
      resolver: zodResolver(createRecipeSchema),
    });

  console.log(watch());

  //   const eCategory = z.nativeEnum(RecipeDifficulty).parse(difficulty);
  //   setValue("Edible.category", eCategory);

  return (
    <Layout>
      <section>
        <div className="mt-12 pl-10">
          <form>
            {/*Details*/}
            <section className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-2">
                <div className="text-lg">Título </div>
                <input
                  autoFocus
                  className="peer rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
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
                  <input
                    {...register("difficulty")}
                    type="radio"
                    value="easy"
                  />
                  <p>Baja</p>
                  <input
                    {...register("difficulty")}
                    type="radio"
                    value="moderate"
                  />
                  <p>Media</p>
                  <input
                    {...register("difficulty")}
                    type="radio"
                    value="hard"
                  />
                  <p>Alta</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="text-lg">Duración </div>
                <input
                  className="peer w-[5%] rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
                  type="number"
                  {...register("timeSpan.hour", {})}
                />
                <p>horas</p>
                <input
                  className="peer w-[5%] rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
                  type="number"
                  {...register("timeSpan.minute", {})}
                />
                <p>minutos</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="text-lg">Raciones </div>
                <input
                  className="peer w-[5%] rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
                  type="number"
                  {...register("portions", {})}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <button className="border-2 border-black">Añadir imagen</button>
                <button className="border-2 border-black">
                  Cambiar imagen
                </button>
                {/* <input type="url" placeholder="img" {...register("img", {})} /> */}
              </div>
            </section>
            {/*End Details*/}
            {/*Recipe*/}
            <section>
              <div>
                <div className="text-lg">Descripción </div>
                <textarea
                  className="peer rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
                  {...register("description", {})}
                />
              </div>
              <div>
                <div className="text-lg">Ingredientes </div>
                <input
                  type="text"
                  placeholder="sdfdsfsefae"
                  {...register("ingredients.name", {})}
                />
                <input
                  className="peer w-[5%] rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
                  type="number"
                  {...register("ingredients.amount", {})}
                />
                <select {...register("ingredients.unit", { required: true })}>
                  <option value="Mr">Taza</option>
                  <option value="Mrs">Gramos</option>
                  <option value="Miss">Cucharada</option>
                  <option value="Dr">Etc</option>
                </select>
              </div>
              <div>
                <div className="text-lg">Pasos </div>
                <textarea
                  className="peer rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
                  {...register("directions", {})}
                />
              </div>
            </section>
            {/*End Recipe*/}
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default RecipeForm;
