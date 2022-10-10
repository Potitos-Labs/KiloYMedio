import type { NextPage } from "next";
import Head from "next/head";
import TabProduct from "../../components/product/TabProduct";

const Create: NextPage = () => {
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
