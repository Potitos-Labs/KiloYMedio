import { zodResolver } from "@hookform/resolvers/zod";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
//import { map } from "@trpc/server/observable";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import superjson from "superjson";

import AllergensComponent from "../../components/Allergen";
import Layout from "../../components/Layout";
import { PopUpAllergen } from "../../components/PopUpAllergen";
import { FormWrapper } from "../../components/payment/FormWrapper";
import { createContextInner } from "../../server/trpc/context";
import { appRouter } from "../../server/trpc/router/_app";
import { AppRouterTypes, trpc } from "../../utils/trpc";
import { IClient, clientSchema } from "../../utils/validations/client";
import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session }),
    transformer: superjson,
  });

  const id = session.user?.id;
  const client = id ? await ssg.user.getClientById.fetch({ id }) : null;

  if (!client) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { trpcState: ssg.dehydrate(), client },
  };
}

const Profile = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { client: c } = props;
  const client = c as AppRouterTypes["user"]["getClientById"]["output"];
  const [edit, setEdit] = useState(false);
  const { data } = trpc.user.getAllClientAllergen.useQuery();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutateAsync } = trpc.user.updateClient.useMutation();
  const allergenList = data?.map((e) => e.allergen) ?? [];
  const { data: allergenTransalator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  if (!client) {
    router.push("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClient>({
    resolver: zodResolver(clientSchema),
    shouldUseNativeValidation: true, // need for :invalid tag tailwind
    criteriaMode: "all",
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

  function changeEdit() {
    setEdit(!edit);
  }

  const onSubmit = useCallback(
    async (data: IClient) => {
      await mutateAsync(data);
    },
    [mutateAsync, router],
  );

  function openPopup() {
    setOpen(true);
  }
  console.log({ errors });
  return (
    <Layout>
      <div className={`${open ? "blur-sm" : ""}`}>
        <u
          className={`mr-4 ${
            edit
              ? "invisible"
              : "absolute right-5 cursor-pointer text-right text-kym2 hover:text-kym4"
          }`}
          onClick={changeEdit}
        >
          Editar perfil
        </u>
        <div className="px-14 md:px-32 lg:px-40">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:fx-row mt-10 flex w-full flex-col lg:flex-row">
              <div className="mr-8 flex flex-col items-center pt-20">
                <Image
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"
                  alt="notfound"
                  width="100"
                  height="100"
                  layout="fixed"
                  objectFit="cover"
                  className="rounded-md"
                ></Image>
              </div>
              <div className="my-10 w-full">
                <FormWrapper title="Datos personales">
                  {/*Nombre y apellidos*/}
                  <div className=" gird-cols-1 grid items-center lg:grid-cols-[17%_83%]">
                    <p className="py-2">Nombre completo</p>
                    <input
                      type="text"
                      {...register("name")}
                      className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                      disabled={!edit}
                    />
                  </div>
                  {errors.name && (
                    <p className="w-full text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                  {/*Correo y Nombre*/}
                  <div className="my-5 grid grid-cols-1 sm:grid-cols-[20%_80%]  md:grid-cols-[15%_75%] lg:grid-cols-[17%_43%_12%_28%]">
                    <p className="py-2">Correo</p>
                    <input
                      type="text"
                      {...register("email")}
                      className="peer mb-2 w-full rounded-md border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                      disabled={!edit}
                    />

                    <p className="py-2 lg:text-center">Teléfono</p>
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      className="peer mb-2 w-full rounded-md border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                      disabled={!edit}
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

            <div className="my-5 w-full">
              <FormWrapper title="Dirección de envío">
                <div className=" relative grid w-full grid-cols-1 py-8 md:grid-cols-[15%_85%] lg:grid-cols-[10%_90%]">
                  <p className="py-2">Dirección</p>
                  <input
                    type="text"
                    {...register("address")}
                    className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                    disabled={!edit}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500">{errors.address?.message}</p>
                )}
                {/*Correo y Nombre*/}
                <div className=":grid-cols-1 grid w-full sm:grid-cols-[20%_80%] md:grid-cols-[15%_35%_15%_35%] lg:grid-cols-[10%_40%_10%_40%]">
                  <p className="py-2">Localidad</p>
                  <input
                    type="text"
                    {...register("location")}
                    className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                    disabled={!edit}
                  />

                  <p className="py-2 md:text-center">CP</p>
                  <input
                    type="text"
                    {...register("CP", { valueAsNumber: true })}
                    disabled={!edit}
                    className="placeholder-gray-300r peer w-full rounded-md border-2 border-gray-300 py-2 pl-5 pr-2"
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

            <div className="my-10 w-full">
              <FormWrapper title="Área de socio">
                <div className="flex flex-col">
                  <div className="relative mb-10 grid w-full grid-cols-2 items-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-[10%_45%_45%] ">
                    <p>DNI</p>
                    <input
                      type="text"
                      {...register("nif")}
                      className="peer w-[200px] rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                      disabled={!edit}
                    />
                    <p className="text-bold ">Mis puntos: 100</p>
                  </div>
                  {errors.nif && (
                    <p className="text-red-500">{errors.nif?.message}</p>
                  )}
                  <div>
                    <p className="cursor-pointer text-kym2 hover:text-kym4">
                      <u>Mis facturas</u>
                    </p>
                  </div>
                </div>
              </FormWrapper>
            </div>
            <div className="my-10 w-full">
              {/* <FormWrapper title="Mis recetas"></FormWrapper> */}
            </div>
            <div className="my-10 w-full">
              <FormWrapper title="Mis alérgenos">
                <div className="grid grid-cols-2 items-start sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {allergenList.map((allergen) => (
                    <div
                      className="align-left mt-2 flex flex-col items-center py-2"
                      key={allergen}
                    >
                      <AllergensComponent
                        allergens={[allergen]}
                        size={70}
                      ></AllergensComponent>
                      <p className=" inline-block text-center normal-case">
                        {allergenTransalator?.get(allergen)}
                      </p>
                    </div>
                  ))}
                </div>
                <p
                  className="mt-8 mr-3 cursor-pointer text-right text-kym2 hover:text-kym4"
                  onClick={openPopup}
                >
                  <u>Modificar alérgenos</u>
                </p>
              </FormWrapper>
            </div>
            <div className="mb-8 text-right">
              <button
                type="submit"
                //onClick={changeEdit}
                className={`${
                  edit
                    ? "rounded-md bg-button px-4 py-2 text-white hover:bg-button_hover"
                    : "invisible"
                }`}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
        <PopUpAllergen open={open} setOpen={setOpen} />
      </div>
    </Layout>
  );
};

export default Profile;
