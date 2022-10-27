import { NextPage } from "next";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRecipeSchema,
  ICreateRecipe,
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
        <div className="mt-12 px-8">
          <form>
            {/*Details*/}
            <section>
              <div>Título </div>
              <input
                autoFocus
                className="peer rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300 invalid:border-pink-600"
                type="text"
                placeholder="Título"
                {...register("name")}
              />
              <div>Dificultad </div>
              <div className="flex flex-row gap-2">
                {/* <select {...register("difficulty", { required: true })}>
                <option value="easy">Fácil</option>
                <option value="moderate">Normal</option>
                <option value="hard">Difícil</option>
              </select> */}

                <input {...register("difficulty")} type="radio" value="easy" />
                <p>fácil</p>
                <input
                  {...register("difficulty")}
                  type="radio"
                  value="moderate"
                />
                <p>medio</p>
                <input {...register("difficulty")} type="radio" value="hard" />
                <p>difícil</p>
              </div>
              <div>Duración </div>
              <input
                type="number"
                placeholder="Duración"
                {...register("timeSpan", {})}
              />

              <div>Raciones </div>

              <input
                type="number"
                placeholder="Raciones"
                {...register("portions", {})}
              />

              {/* IMAGEN */}
              {/* <input type="url" placeholder="img" {...register("img", {})} /> */}
            </section>
            {/*End Details*/}
            {/*Recipe*/}
            <section>
              <div>Ingredientes </div>
              <div>Pasos </div>
            </section>
            {/*End Recipe*/}
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default RecipeForm;
