import type { NextPage } from "next";
import Head from "next/head";
import PeanutIcon from "../components/Allergens/PeanutIcon";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["user.getAllUsers"]);

  return (
    <Layout>
      <>
        <Head>
          <title>Kilo y medio</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            Kilo <span className="text-green-200">Y</span> Medio
          </h1>
          <p className="text-2xl text-gray-700">Nuestro equipo:</p>
          <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-2 lg:w-2/3">
            {data ? (
              data.map((user) => (
                <TechnologyCard
                  key={user.id}
                  name={user.name}
                  description={user.email}
                  documentation={""}
                ></TechnologyCard>
              ))
            ) : (
              <p className="text-right">Loading..</p>
            )}
          </div>
        </main>
      </>
    </Layout>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
