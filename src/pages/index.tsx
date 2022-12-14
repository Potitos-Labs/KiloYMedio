import AdminPage from "@components/AdminPage";
import ClientePage from "@components/ClientPage";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../components/Layout";

// import { trpc } from "@utils/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";
  return (
    <Layout bgColor={""} headerBgLight={false} headerTextDark={false}>
      <Head>
        <title>Kilo y medio</title>
        <meta name="description" content="Tienda de productos a granel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{isAdmin ? <AdminPage /> : <ClientePage />}</div>
    </Layout>
  );
};

export default Home;
