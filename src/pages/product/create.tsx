import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Error from "next/error";
import Head from "next/head";

import Layout from "../../components/Layout";
import TabProduct from "../../components/product/TabProduct";

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
      <Layout>
        <Head>
          <title>Crear producto</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center">
          <TabProduct />
        </main>
      </Layout>
    </div>
  );
};

export default Create;
