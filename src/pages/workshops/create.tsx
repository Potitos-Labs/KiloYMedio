import Layout from "@components/Layout";
import { Tab } from "@headlessui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Error from "next/error";
import clsx from "clsx";
import OnlineWorkshopForm from "@components/workshop/OnlineWorkshopform";
import OnsiteWorkshopForm from "@components/workshop/OnsiteWorkshopform";

const CreateWorkshop: NextPage = () => {
  const { data, status } = useSession();

  if (data?.user?.role != "admin") {
    return <Error statusCode={404}></Error>;
  }

  if (status == "loading") {
    <div>Cargando...</div>;
  }
  const typeWorkshop = {
    Online: {
      name: "Online",
      form: <OnlineWorkshopForm />,
    },
    Onsite: {
      name: "Presencial",
      form: <OnsiteWorkshopForm />,
    },
  };

  return (
    <div>
      <Layout
        bgColor={"bg-base-100"}
        headerBgLight={true}
        headerTextDark={true}
      >
        <main className="flex flex-col items-center justify-center">
          <div className="m-auto flex w-full flex-col items-center px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex max-w-lg space-x-1 rounded-xl bg-primary p-1">
                {Object.values(typeWorkshop).map((type) => (
                  <Tab
                    key={type.name}
                    className={({ selected }) =>
                      clsx(
                        "text-bold text-md w-40 rounded-lg py-2.5 text-lg font-medium leading-5 md:w-44",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white text-primary shadow"
                          : "hover:bg-accenthover:text-white text-white",
                      )
                    }
                  >
                    {type.name}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2 ">
                {Object.values(typeWorkshop).map((type, idx) => (
                  <Tab.Panel key={idx}>{type.form}</Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default CreateWorkshop;
