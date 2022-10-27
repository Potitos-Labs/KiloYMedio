import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { userAgent } from "next/server";
import SesameIcon from "../../components/Allergens/SesameIcon";
import Layout from "../../components/Layout";
import { FormWrapper } from "../../components/payment/FormWrapper";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Allergen } from "@prisma/client";
import AllergensComponent from "../../components/Allergen";

const Profile: NextPage = () => {
  const { data: session } = useSession();
  const areSession = session?.user;
  //const { edit, setedit } = useState(false);
  const { data } = trpc.product.getAllAllergensInSpanish.useQuery();
  //const [UserName, setUsername] = useState(session?.user?.name);

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
            <p className="cursor-pointer text-kym2 hover:text-kym4">
              <u>Editar perfil</u>
            </p>
          </div>
          <div className="my-10 ml-20 w-full">
            <FormWrapper title="Datos Personales">
              {/*Nombre y apellidos*/}
              <div className="relative flex w-full flex-row gap-4">
                <p className="mb-3">Nombre</p>
                <input
                  type="text"
                  name="Name"
                  //value = {UserName}
                  className="w-[300px] border"
                ></input>
                <p> Apellidos</p>
                <input
                  type="text"
                  name="UserName"
                  className="w-[300px] border"
                ></input>
              </div>
              {/*Correo y Nombre*/}
              <div className=" relative my-5 flex w-full flex-row gap-4">
                <p> Correo</p>
                <input
                  type="text"
                  name="Gmail"
                  className="w-[300px] border"
                ></input>
                <p>Teléfono</p>
                <input
                  type="text"
                  name="tlf"
                  className="w-[200px] border"
                ></input>
              </div>
            </FormWrapper>
          </div>
        </div>
        <div className="my-10 ml-20 w-full">
          <FormWrapper title="Dirección de envio">
            <div className="relative flex w-full flex-row gap-4 py-8">
              <p className="mb-3">Dirección</p>
              <input
                type="text"
                name="Dirección"
                className="w-[400px] border"
              ></input>
              <p>Piso, bloque ...</p>
              <input
                type="text"
                name="Bloque"
                className="w-[300px] border"
              ></input>
            </div>
            {/*Correo y Nombre*/}
            <div className="relative flex w-full flex-row gap-4">
              <p> Localidad</p>
              <input type="text" name="Localidad" className="border"></input>
              <p>Cp</p>
              <input type="text" name="PostalCode" className="border"></input>
            </div>
          </FormWrapper>
        </div>
        <div className="my-10 ml-20 w-full">
          <FormWrapper title="Area de socio">
            <div className="flex flex-col">
              <div className="relative mb-5 flex w-full flex-row gap-4">
                <p>DNI</p>
                <input
                  type="text"
                  name="DNI"
                  value="29222420T"
                  className="w-[200px] border"
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
        <div className="my-10 ml-20 w-full">
          <FormWrapper title="Mis alérgenos">
            <div>
              <AllergensComponent
                allergens={data?.map((e) => e.allergen) ?? []}
                size={100}
              ></AllergensComponent>
            </div>
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
