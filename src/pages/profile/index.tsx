import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "../../components/Layout";
import { FormWrapper } from "../../components/payment/FormWrapper";
import Image from "next/image";
import { useState } from "react";
import { AppRouterTypes, trpc } from "../../utils/trpc";
import AllergensComponent from "../../components/Allergen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client, clientSchema } from "../../utils/validations/client";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createContextInner } from "../../server/trpc/context";
import { appRouter } from "../../server/trpc/router/_app";
import superjson from "superjson";
import { useRouter } from "next/router";
import Popup from "reactjs-popup";

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
  const { data } = trpc.product.getAllAllergensInSpanish.useQuery();
  const router = useRouter();
  const allergenList = data?.map((e) => e.allergen) ?? [];
  const [open, setOpen] = useState(false);
  const { data: allergenTransalator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  if (!client) {
    router.push("/login");
  }

  const { register, handleSubmit } = useForm<Client>({
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
  function openPopUp() {
    setOpen(true);
  }
  function closePopUp() {
    setOpen(false);
  }

  function changeEdit() {
    setEdit(!edit);
  }
  function onSubmit() {
    setEdit(!edit);
  }

  return (
    <Layout>
      <p
        className={`${
          edit
            ? "invisible"
            : "absolute right-40 cursor-pointer text-right text-kym2 hover:text-kym4"
        }`}
        onClick={changeEdit}
      >
        Editar perfil
      </p>
      <div className="px-40">
        <div className="mt-5 flex w-full flex-row">
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
            <p
              className={` ${
                edit
                  ? "invisible pt-3"
                  : "cursor-pointer pt-3 text-kym2 hover:text-kym4"
              }`}
            >
              <u>Editar foto</u>
            </p>
          </div>
          <div className="my-10 w-full">
            <FormWrapper title="Datos personales">
              {/*Nombre y apellidos*/}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid items-center lg:grid-cols-[20%_80%]">
                  <p className="py-2">Nombre completo</p>
                  <input
                    type="text"
                    {...register("name")}
                    className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    disabled={!edit}
                  ></input>
                </div>
                {/*Correo y Nombre*/}
                <div className="my-5 grid grid-cols-[18%_82%] lg:grid-cols-[8%_52%_10%_30%]">
                  <p className="py-2">Correo</p>
                  <input
                    type="text"
                    {...register("email")}
                    className="peer mb-2 w-full rounded-md border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    disabled={!edit}
                  ></input>
                  <p className="py-2 text-center">Teléfono</p>
                  <input
                    type="text"
                    {...register("phoneNumber")}
                    className="peer mb-2 w-full rounded-md border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    disabled={!edit}
                  ></input>
                </div>{" "}
              </form>
            </FormWrapper>
          </div>
        </div>
        <div className="my-5 w-full">
          <FormWrapper title="Dirección de envío">
            <div className="relative flex w-full flex-row gap-4 py-8">
              <p className="py-2">Dirección </p>
              <input
                type="text"
                {...register("address")}
                className="peer w-full  rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                disabled={!edit}
              ></input>
            </div>
            {/*Correo y Nombre*/}
            <div className=" sm:grid-col-[10%_90%] grid-col-[10%_90%] grid w-full md:grid-cols-[15%_35%_15%_35%]  lg:grid-cols-[10%_28%_10%_27%_5%_20%_]  ">
              <p className="py-2"> Población</p>
              <input
                type="text"
                name="poblacion"
                className=" peer w-auto rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                disabled={!edit}
              ></input>
              <p className="py-2 md:text-center lg:text-center"> Localidad</p>
              <input
                type="text"
                {...register("location")}
                className=" peer w-auto rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                disabled={!edit}
              ></input>
              <p className="py-2 md:text-center lg:text-center">CP</p>
              <input
                type="text"
                {...register("CP")}
                disabled={!edit}
                className=" placeholder-gray-300r peer w-full rounded-md border-2 border-gray-300 py-2 pl-5 pr-2"
              ></input>
            </div>
          </FormWrapper>
        </div>
        <div className="my-10 w-full">
          <FormWrapper title="Área de socio">
            <div className="flex flex-col">
              <div className="relative mb-5 flex w-full flex-row gap-4">
                <p>DNI</p>
                <input
                  type="text"
                  {...register("nif")}
                  value="29222420T"
                  className="peer w-[200px] rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                  disabled={!edit}
                ></input>
                <p className="text-bold "> Mis puntos: 100</p>
              </div>
              <div>
                <p className="cursor-pointer text-kym2 hover:text-kym4">
                  <u>Mis facturas</u>
                </p>
              </div>
            </div>
          </FormWrapper>
        </div>
        <div className="my-10 w-full">
          <FormWrapper title="Mis alérgenos">
            <div className="grid grid-cols-2 items-start sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {allergenList.map((allergen) => (
                <div
                  className="align-left  mt-2 flex flex-col items-center py-2"
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
              className="cursor-pointer text-right text-kym2 hover:text-kym4"
              onClick={openPopUp}
            >
              <u>Modificar alérgenos</u>
            </p>
          </FormWrapper>
        </div>
        <div className="mb-8 text-right">
          <button
            type="submit"
            className={`${
              edit
                ? "rounded-md bg-button px-4 py-2 text-white hover:bg-button_hover"
                : "invisible"
            }`}
          >
            Guardar cambios
          </button>
        </div>
      </div>
      <Popup open={open} modal closeOnDocumentClick onClose={closePopUp}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="w-1/3 rounded-md bg-white">
            <h1 className="rounded-t-md bg-button py-2 text-center text-lg font-bold text-white">
              Alérgenos
            </h1>
            <p className="m-3">
              <span className="font-bold">¡Atención!</span>
            </p>
            <p className="m-3">
              Estás apunto de eliminar este elemento de la web, esta acción es
              irreversible.
            </p>
            <p className="m-3 mt-4 text-center">
              ¿Estás seguro de que quieres continuar?
            </p>
            <div className="flex justify-end">
              <button className="mb-3 mt-5 rounded-md bg-button py-1 px-2 text-white hover:bg-button_hover">
                Confirmar
              </button>
              <button
                className="m-3  mt-5 rounded-md border border-button bg-transparent px-3 hover:border-transparent hover:bg-button_hover hover:text-white"
                onClick={closePopUp}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </Layout>
  );
};

export default Profile;
