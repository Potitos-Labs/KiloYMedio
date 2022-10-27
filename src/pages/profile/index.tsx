import { NextPage } from "next";

import Layout from "../../components/Layout";
import { FormWrapper } from "../../components/payment/FormWrapper";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import AllergensComponent from "../../components/Allergen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client, clientSchema } from "../../utils/validations/client";

const Profile: NextPage = () => {
  const [edit, setEdit] = useState(false);
  const { data } = trpc.product.getAllAllergensInSpanish.useQuery();
  //const { mutateAsync: updateMutation } =
  //trpc.cart.updateAmountProduct.useMutation({});

  const { register, handleSubmit } = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "Juan",
      email: "johnny.altes12gmail.com",
      address: "Calle ALvaro de Bazan 18 ",
      image: "",
      location: "Valencia",
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
      <div className="px-20">
        <div className="mt-20 flex flex-row">
          <div className="mx-5 flex flex-col items-center pt-10">
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
              className={`${
                edit ? "invisible" : "cursor-pointer text-kym2 hover:text-kym4"
              }`}
              onClick={changeEdit}
            >
              <u>Editar perfil</u>
            </p>
          </div>
          <div className="my-10 ml-20 w-full">
            <FormWrapper title="Datos Personales">
              {/*Nombre y apellidos*/}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" relative flex w-full flex-row items-center gap-4">
                  <p className="">Nombre completo</p>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-[400px] border"
                    disabled={!edit}
                  ></input>
                </div>
                {/*Correo y Nombre*/}
                <div className=" relative my-5 flex w-full flex-row gap-4">
                  <p> Correo</p>
                  <input
                    type="text"
                    {...register("email")}
                    className="w-[300px] border"
                    disabled={!edit}
                  ></input>
                  <p>Teléfono</p>
                  <input
                    type="text"
                    //{...register("tlf")}
                    className="w-[200px] border"
                    disabled={!edit}
                  ></input>
                </div>{" "}
              </form>
            </FormWrapper>
          </div>
        </div>
        <div className="my-10 ml-20">
          <FormWrapper title="Dirección de envio">
            <div className="relative flex w-full flex-row gap-4 py-8">
              <p>Dirección</p>
              <input
                type="text"
                {...register("address")}
                className="w-[400px] border"
                disabled={!edit}
              ></input>
            </div>
            {/*Correo y Nombre*/}
            <div className="relative flex w-full flex-row gap-4">
              <p> Localidad</p>
              <input
                type="text"
                {...register("location")}
                className="border"
                disabled={!edit}
              ></input>
              <p>Cp</p>
              <input
                type="text"
                {...register("CP")}
                disabled={!edit}
                className="border"
              ></input>
            </div>
          </FormWrapper>
        </div>
        <div className="my-10 ml-20">
          <FormWrapper title="Area de socio">
            <div className="flex flex-col">
              <div className="relative mb-5 flex w-full flex-row gap-4">
                <p>DNI</p>
                <input
                  type="text"
                  {...register("nif")}
                  value="29222420T"
                  className="w-[200px] border"
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
        <div className="my-10 ml-20">
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
