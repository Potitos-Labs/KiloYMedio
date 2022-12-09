import Layout from "../../components/Layout";
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
import { AppRouterTypes } from "@utils/trpc";

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

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="mt-24 mb-[8] grid grid-cols-[55%_45%]">
        <div className="pl-28">
          <MyProfile image={client.image} name={client.name} />

          <div className="mt-6 grid grid-cols-[40%_60%] gap-4 pr-4">
            <TinyText
              text="Próximo descuento por compra superior a 35€"
              percentage="10%"
            />
            <TinyText
              text="Puntos necesarios para llegar al descuento"
              percentage="14"
            />
          </div>
          <CenterItem />
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
