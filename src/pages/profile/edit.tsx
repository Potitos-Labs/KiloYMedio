import Layout from "../../components/Layout";
import { FormWrapper } from "../../components/payment/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { IClient, clientSchema } from "../../utils/validations/client";
import { useSession } from "next-auth/react";
import { Allergen } from "@prisma/client";
import AllergensComponent from "@components/Allergens";
import { z } from "zod";
import { UploadImageRecipe } from "@components/ui/UploadImageRecipe";

const EditProfile = () => {
  const sesion = useSession();
  const client = trpc.user.client.getById.useQuery().data;
  const utils = trpc.useContext();
  const router = useRouter();
  const { mutateAsync } = trpc.user.client.update.useMutation({
    onSuccess: () => {
      utils.user.client.getById.invalidate();
    },
  });
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

  const { mutateAsync: update } = trpc.user.client.updateAllergen.useMutation({
    onSuccess() {
      utils.user.getAllClientAllergen.invalidate();
    },
  });

  if (sesion.status === "unauthenticated") {
    router.push("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IClient>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name,
      email: client?.email,
      address: client?.address,
      image: client?.image,
      location: client?.location,
      CP: client?.CP,
      phoneNumber: client?.phoneNumber,
      nif: client?.nif,
    },
  });

  const onSubmit = useCallback(
    async (data: IClient) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push(`/profile`);
      }
    },
    [mutateAsync, router],
  );
  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <div className="m-5 rounded-lg bg-base-100 py-6 md:m-12">
        <div className="px-8 md:px-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 w-full">
              <div className="flex justify-center">
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <div className="flex text-center">
                        <UploadImageRecipe
                          setImageURL={onChange}
                          value={value ?? "/img/placeholder.jpg"}
                          profileStyle="rounded-full h-40 w-40"
                        />
                      </div>
                    </>
                  )}
                ></Controller>
              </div>
              <div className="rounded-box my-10 w-full border-[1px] border-base-300 p-6">
                <FormWrapper title="Datos personales">
                  {/*Nombre y apellidos*/}
                  <div className="gird-cols-1 mt-8 grid items-center lg:grid-cols-[17%_83%]">
                    <p className="py-2 text-sm">Nombre completo</p>
                    <input
                      type="text"
                      {...register("name")}
                      className="peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    />
                  </div>
                  {errors.name && (
                    <p className="w-full text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                  {/*Correo y Nombre*/}
                  <div className="my-5 grid grid-cols-1 sm:grid-cols-[20%_80%] md:grid-cols-[25%_75%] lg:grid-cols-[17%_43%_14%_26%]">
                    <p className="py-2 text-sm">Correo</p>
                    <input
                      type="text"
                      {...register("email")}
                      className="peer mb-2 w-full rounded-full border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    />

                    <p className="py-2 text-sm lg:text-center">Tel??fono</p>
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      className="peer mb-2 w-full rounded-full border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    />
                    <p className="text-sm">DNI</p>
                    <input
                      type="text"
                      {...register("nif")}
                      className="peer w-[200px] rounded-full border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500">{errors.email?.message}</p>
                  )}
                  {errors.phoneNumber && (
                    <p className="text-red-500">
                      {errors.phoneNumber?.message}
                    </p>
                  )}
                </FormWrapper>
              </div>
            </div>

            <div className="rounded-box my-10 w-full border-[1px] border-base-300 p-6">
              <FormWrapper title="Direcci??n de env??o">
                <div className="relative grid w-full grid-cols-1 py-4 lg:grid-cols-[18%_82%]">
                  <p className="py-2 text-sm">Direcci??n</p>
                  <input
                    type="text"
                    {...register("address")}
                    className="peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500">{errors.address?.message}</p>
                )}
                {/*Correo y Nombre*/}
                <div className="grid sm:grid-cols-[20%_78%] sm:gap-4 lg:grid-cols-[18%_36%_10%_36%] lg:gap-0">
                  <p className="py-2 text-sm">Localidad</p>
                  <input
                    type="text"
                    {...register("location")}
                    className="peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                  />

                  <p className="py-2 text-sm md:text-center">CP</p>
                  <input
                    type="text"
                    {...register("CP", { valueAsNumber: true })}
                    className="placeholder-gray-300r peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 pr-2"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500">{errors.location?.message}</p>
                )}
                {errors.CP && (
                  <p className="text-red-500">{errors.CP?.message}</p>
                )}
              </FormWrapper>
            </div>
            <div className="rounded-box my-6 w-full border-[1px] border-base-300 p-6">
              <FormWrapper title="Al??rgenos">
                <div>
                  <div className="items-left sm:p- grid  md:grid-cols-2 lg:grid-cols-3">
                    {AllallergenList.map((allergen) => (
                      <div className="flex gap-1 py-2" key={allergen}>
                        <label key={allergen}>
                          <input
                            className="form-check-input mt-1 mr-1 h-4 w-4 cursor-pointer rounded-sm border border-gray-500 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none focus:ring-2"
                            type="checkbox"
                            value={allergen}
                            id="flexCheckChecked"
                            defaultChecked={clientAllergenList.includes(
                              allergen,
                            )}
                            onChange={(e) => allergensHandler(e.target.value)}
                          ></input>
                        </label>
                        <AllergensComponent
                          allergens={[allergen]}
                          size={25}
                        ></AllergensComponent>
                        {allergenTranslator?.get(allergen)}
                      </div>
                    ))}
                  </div>
                </div>
              </FormWrapper>
            </div>
            <div className="mb-10 text-center sm:text-right">
              <button
                type="submit"
                onClick={() => update({ allergen: allergensList })}
                className="btn rounded-full border-none bg-primary px-4 py-2 font-raleway text-sm text-base-100"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
