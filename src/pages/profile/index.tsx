import Layout from "../../components/Layout";
import Image from "next/image";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth/next";
import superjson from "superjson";
import { createContextInner } from "../../server/trpc/context";
import { appRouter } from "../../server/trpc/router/_app";

import { authOptions } from "../api/auth/[...nextauth]";
import MyProfile from "@components/profile/profileCards/MyProfile";
import TinyText from "@components/profile/profileCards/TinyText";
import Footer from "@components/profile/profileCards/Footer";
import CenterItem from "@components/profile/profileCards/CenterItem";
import { AppRouterTypes, trpc } from "@utils/trpc";

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
  const client = id ? await ssg.user.client.getById.fetch({ id }) : null;

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
  const client = c as AppRouterTypes["user"]["client"]["getById"]["output"];

  const { data } = trpc.user.getAllClientAllergen.useQuery();

  const { data: favoriteUserRecipes } =
    trpc.user.client.getFavoriteRecipes.useQuery();

  const allergenList = data?.map((e) => e.allergen) ?? [];

  const { data: workshopList } = trpc.user.client.getEnrollWorkshops.useQuery();

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="sm:first-letter  mt-16 mb-7 grid grid-cols-1  lg:grid-cols-[58%_42%]">
        <div className="px-6 sm:px-14 lg:pl-28">
          <MyProfile image={client.image} name={client.name} />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[40%_60%] sm:pr-4 ">
            <TinyText
              text="Próximo descuento por compra superior a 35€"
              percentage="10%"
            />
            <TinyText
              text="Puntos necesarios para llegar al descuento"
              percentage="14"
            />
          </div>
          <CenterItem
            favoriteUserRecipes={favoriteUserRecipes}
            allergenList={allergenList}
            workshopList={workshopList}
          />
          <Footer />
        </div>
        <div className="relative -mt-2  max-h-[650px] items-start justify-start align-top lg:block">
          <Image
            src="/img/bolitas.png"
            alt="Mi imagen"
            objectFit="contain"
            layout="fill"
            className=" max-h-[1200px]"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
