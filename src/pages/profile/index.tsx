import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { userAgent } from "next/server";
import SesameIcon from "../../components/Allergens/SesameIcon";
import Layout from "../../components/Layout";
import { FormWrapper } from "../../components/payment/FormWrapper";
import Image from "next/image";

const Profile: NextPage = () => {
  const { data: session } = useSession();
  const areSession = session?.user;

  return (
    <Layout>
      <div>
        <div className="flex flex-row py-10">
          <Image
            src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"
            alt="notfound"
            width="100"
            height="100"
            layout="fixed"
            objectFit="cover"
            className="rounded-md"
          ></Image>
          <h2 className="px-5 py-10"> tu nombre</h2>
        </div>

        <FormWrapper title="Datos Personales">
          {/*Nombre y apellidos*/}
          <div className="relative flex w-full flex-row gap-4 py-4">
            <p className="mb-3">Nombre</p>
            <input type="text" name="Name" className="border"></input>
            <p> Apellidos</p>
            <input type="text" name="UserName" className="border"></input>
          </div>
          {/*Correo y Nombre*/}
          <div className="relative flex w-full flex-row gap-4">
            <p> Correo</p>
            <input type="text" name="Gmail" className="border"></input>
            <p>Teléfono</p>
            <input type="text" name="tlf" className="border"></input>
          </div>
        </FormWrapper>

        <hr className="border-1 mt-5 border-gray-400 pb-3" />
      </div>
    </Layout>
  );
};

export default Profile;
