import type { NextPage } from "next";
import Head from "next/head";
import TabProduct from "../../components/product/TabProduct";
import Error from "next/error";
import { useSession } from "next-auth/react";

const Create: NextPage = () => {
  const { data, status } = useSession();

  if (status == "unauthenticated" || data?.user?.role != "admin") {
    return <Error statusCode={404}></Error>;
  }

  if (status == "loading") {
    <div>Cargando...</div>;
  }

  return (
    <div>
      <Head>
        <title>Crear producto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center">
        <TabProduct />
      </main>
    </div>
  );
};

export default Create;
