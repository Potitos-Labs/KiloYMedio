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
      CP: 100,
      phoneNumber: 606796767,
      nif: "29222420T",
    },
  });

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
            <div className=" grid w-full grid-rows-3 gap-4  ">
              <p className="py-2"> Población</p>
              <input
                type="text"
                name="Poblation"
                className=" peer w-auto rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                disabled={!edit}
              ></input>
              <p className="py-2"> Localidad</p>
              <input
                type="text"
                {...register("location")}
                className=" peer w-auto rounded-md border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                disabled={!edit}
              ></input>
              <p className="py-2">CP</p>
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
            <div>
              <AllergensComponent
                allergens={data?.map((e) => e.allergen) ?? []}
                size={100}
              ></AllergensComponent>
              <p
                className="cursor-pointer text-right text-kym2 hover:text-kym4"
                onClick={changeEdit}
              >
                <u>Modificar alérgenos</u>
              </p>
            </div>
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
    </Layout>
  );
};

export default Profile;
