import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import Popup from "reactjs-popup";

interface DotMenuProps {
  id: string;
  name: string;
  type: string;
  updateFunction: (id: string) => void;
  deleteFunction: (id: string) => void;
  className?: string;
}

const DotMenu = ({
  id,
  name,
  type,
  updateFunction,
  deleteFunction,
  className,
}: DotMenuProps) => {
  const [open, setOpen] = useState(false);

  function cancelHandler() {
    setOpen(false);
  }

  function AcceptHandler() {
    setOpen(false);
    deleteFunction(id);
  }

  function confirmAction() {
    setOpen(true);
  }

  return (
    <div className={`${className}`}>
      <div className="dropdown relative flex h-10 w-10 items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className=" flex items-center">
              <AiOutlineMore className="h-7 w-7" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "btn-sm"
                    } group flex w-full items-center  px-2 py-2 text-sm`}
                    onClick={() => updateFunction(id)}
                  >
                    <AiOutlineEdit className="mr-2 fill-base-content" />
                    Editar
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={confirmAction}
                    className={`${
                      active && "btn-sm"
                    } group flex w-full items-center rounded-b-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineDelete className="mr-2 fill-kym2" />
                    Eliminar
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <Popup open={open} modal closeOnDocumentClick onClose={cancelHandler}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="w-11/12 rounded-md bg-white sm:w-2/5">
            <h1 className="rounded-t-md bg-primary py-2 text-center text-lg font-bold text-white">
              Eliminar {type}
            </h1>
            <p className="m-3">
              <span className="font-bold">¡Atención!</span>
            </p>
            <p className="m-3 text-justify">
              Estás apunto de eliminar {type == "producto" ? "el" : "la"} {type}{" "}
              <span className="font-medium italic">{name}</span> de la web, esta
              acción es irreversible.
            </p>
            <p className="m-3 mt-4 text-center">
              ¿Estás seguro de que quieres continuar?
            </p>
            <div className="mb-3 mr-3 flex justify-end gap-2 ">
              <button
                className=" ml-3 mt-3 rounded-full border border-base-content bg-transparent px-1 hover:border-primary sm:mt-5 sm:px-3"
                onClick={cancelHandler}
              >
                Cancelar
              </button>
              <button
                className="btn-sm mt-3 rounded-md bg-base-content  text-base-100 hover:bg-primary sm:mt-5 sm:py-1 sm:px-4"
                onClick={AcceptHandler}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default DotMenu;
