import CreateEdit from "@components/recipe/CreateEdit";
import { createContextInner } from "@server/trpc/context";
import { appRouter } from "@server/trpc/router/_app";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import superjson from "superjson";
import Layout from "../../components/Layout";

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const units = await ssg.recipe.getIngredientUnitInSpanish.fetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
      units,
    },
    revalidate: 1,
  };
}

export default function CreateRecipe(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <Layout>
      <CreateEdit units={props.units}></CreateEdit>
    </Layout>
  );
}
