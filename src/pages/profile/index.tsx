import Layout from "../../components/Layout";
import Image from "next/image";

import MyProfile from "@components/profile/profileCards/MyProfile";
import TinyText from "@components/profile/profileCards/TinyText";
import FooterProfile from "@components/profile/profileCards/FooterProfile";
import CenterItem from "@components/profile/profileCards/CenterItem";
import { trpc } from "@utils/trpc";

const Profile = () => {
  const client = trpc.user.client.getById.useQuery().data;

  const { data } = trpc.user.getAllClientAllergen.useQuery();

  const { data: favoriteUserRecipes } =
    trpc.user.client.getFavoriteRecipes.useQuery();

  const allergenList = data?.map((e) => e.allergen) ?? [];

  const { data: workshopList } = trpc.user.client.getEnrollWorkshops.useQuery();
  const { data: myRecipesList } = trpc.user.client.getOwnRecipes.useQuery();

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="sm:first-letter mt-[10px] mb-7 grid h-full min-h-90% grid-cols-1 place-content-center sm:mt-0 lg:grid-cols-[58%_42%]">
        <div className="grid items-center px-6 align-middle sm:px-14 lg:pl-28">
          {client && <MyProfile image={client.image} name={client.name} />}

          <div className="mt-[20px] grid grid-cols-1 gap-2 sm:grid-cols-[40%_60%] sm:gap-4 sm:pr-4 ">
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
            myRecipesList={myRecipesList}
          />
          <FooterProfile />
        </div>

        <div className="-mt-[-1  px]   relative  hidden max-h-[800px] items-start justify-start align-top lg:block">
          <Image
            src="/img/bolitas.svg"
            alt="Mi imagen"
            objectFit="contain"
            layout="fill"
            className="max-h-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
