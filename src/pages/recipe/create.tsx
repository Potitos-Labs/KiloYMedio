import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";

import Layout from "../../components/Layout";
import IncDecRecipe from "../../components/components/IncDecRecipe";
import { clearNumber } from "../../components/payment/utils";
import {
  ICreateRecipe,
  createRecipeSchema,
} from "../../utils/validations/recipe";

const RecipeForm: NextPage = () => {
  //   const { data: allProducts } = trpc.product.getAllProducts.useQuery();
  const { register, setValue, getValues, control, /* handleSubmit,*/ watch } =
    useForm<ICreateRecipe>({
      resolver: zodResolver(createRecipeSchema),
    });

  console.log(watch());

  return (
    <Layout>
      <section>
        <div className="mt-12 pl-10">
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
                  <>
                    <button
                      disabled={(value || 0) == 0}
                      className={`border-r-[1px] border-black bg-transparent px-3 font-semibold ${
                        value == 0 ? "cursor-not-allowed opacity-60" : ""
                      }`}
                      onClick={() => {
                        onChange(Number(value) - 1);
                      }}
                    >
                      -
                    </button>
                    <input
                      className="w-16 text-center focus-within:outline-none"
                      type="text"
                      maxLength={2}
                      defaultValue="1"
                      value={value}
                      onChange={({ target: { value } }) =>
                        onChange(
                          Number(clearNumber(value) || 0) > 10
                            ? 10
                            : Number(clearNumber(value) || 0),
                        )
                      }
                      onBlur={onBlur}
                      ref={ref}
                    />
                  </>
                )}
              ></Controller>
              {/* <IncDecRecipe
                maximum={23}
                property={"timeSpan.hour"}
                register={register("timeSpan.hour")}
                getValues={getValues}
                setValue={setValue}
              ></IncDecRecipe> */}
              <p>horas</p>
              <IncDecRecipe
                maximum={59}
                property={"timeSpan.minute"}
                register={register("timeSpan.minute")}
                getValues={getValues}
                setValue={setValue}
              ></IncDecRecipe>
              <p>minutos</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Raciones </div>
              <IncDecRecipe
                maximum={15}
                property={"portions"}
                register={register("portions")}
                getValues={getValues}
                setValue={setValue}
              ></IncDecRecipe>
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
                className="peer rounded-md border-2 border-gray-300 py-2 pl-3 pr-2 placeholder-gray-300"
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
              <IncDecRecipe
                maximum={999}
                property={"ingredients.amount"}
                register={register("ingredients.amount")}
                getValues={getValues}
                setValue={setValue}
              ></IncDecRecipe>
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
        </div>
      </section>
    </Layout>
  );
};

export default RecipeForm;
