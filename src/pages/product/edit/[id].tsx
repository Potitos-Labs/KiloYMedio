import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Error from "next/error";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import EdibleForm from "../../../components/product/EdibleForm";
import NonEdibleForm from "../../../components/product/NonEdibleForm";
import { trpc } from "../../../utils/trpc";

const EditProduct: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isFetched } = trpc.product.getById.useQuery({ id });

  if (status == "unauthenticated" || session?.user?.role != "admin") {
    return <Error statusCode={404}></Error>;
  }

  if (status == "loading") {
    return <div>Cargando...</div>;
  }

  if (!data && isFetched) {
    return <Error statusCode={404}></Error>;
  }

  const isEdible = data?.Edible != null;
  let form = <></>;
  if (isEdible) {
    form = <EdibleForm product={data} />;
  } else if (data?.NonEdible) {
    form = <NonEdibleForm product={data} />;
  }

  return <Layout>{form}</Layout>;
};

export default EditProduct;
