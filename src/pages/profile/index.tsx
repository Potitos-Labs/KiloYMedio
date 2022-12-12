import Layout from "../../components/Layout";
import Image from "next/image";

import MyProfile from "@components/profile/profileCards/MyProfile";
import TinyText from "@components/profile/profileCards/TinyText";
import Footer from "@components/profile/profileCards/Footer";
import CenterItem from "@components/profile/profileCards/CenterItem";
import { trpc } from "@utils/trpc";

const Profile = () => {
  const client = trpc.user.client.getById.useQuery().data;

  const { data } = trpc.user.getAllClientAllergen.useQuery();

  const { data: favoriteUserRecipes } =
    trpc.user.client.getFavoriteRecipes.useQuery();

  const allergenList = data?.map((e) => e.allergen) ?? [];

  const { data: workshopList } = trpc.user.client.getEnrollWorkshops.useQuery();

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="sm:first-letter  mt-16 mb-7 grid grid-cols-1  lg:grid-cols-[58%_42%]">
        <div className="px-6 sm:px-14 lg:pl-28">
          {client && <MyProfile image={client.image} name={client.name} />}

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
        <div className="relative -mt-2 hidden  max-h-[650px] items-start justify-start align-top lg:block">
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
