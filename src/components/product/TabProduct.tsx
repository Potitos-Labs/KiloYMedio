import { Tab } from "@headlessui/react";
import { useState } from "react";
import EdibleForm from "./EdibleForm";
import NonEdibleForm from "./NonEdibleForm";

export default function TabProduct() {
  const typeProduct = {
    Edible: {
      name: "Comestible",
      form: <EdibleForm></EdibleForm>,
    },
    NonEdible: {
      name: "No comestible",
      form: <NonEdibleForm></NonEdibleForm>,
    },
  };

  return (
    <div className="m-auto flex w-full flex-col items-center px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex max-w-lg space-x-1 rounded-xl bg-kym2/[0.9] p-1">
          {Object.values(typeProduct).map((type) => (
            <Tab
              key={type.name}
              className={({ selected }) =>
                classNames(
                  "text-bold text-md w-40 rounded-lg py-2.5 text-lg font-medium leading-5 md:w-44",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-kym2 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-kym2 shadow"
                    : "text-white hover:bg-kym2/[0.12] hover:text-white",
                )
              }
            >
              {type.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 ">
          {Object.values(typeProduct).map((type, idx) => (
            <Tab.Panel key={idx}>{type.form}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
