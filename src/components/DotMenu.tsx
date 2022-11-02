import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";

import { trpc } from "../utils/trpc";

const DotMenu = ({ id }: { id: string }) => {
  const notify = () => toast.success("¡Producto eliminado!");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data } = useSession();

  if (data?.user?.role != "admin") {
    return <div></div>;
  }
  const utils = trpc.useContext();
  const { mutateAsync } = trpc.product.delete.useMutation({
    onSuccess() {
      utils.product.getAllProducts.invalidate();
    },
  });

  function cancelHandler() {
    setOpen(false);
  }

  function AcceptHandler() {
    setOpen(false);
    mutateAsync({ productId: id });
    router.push(`/product`);
    notify();
  }

  function confirmAction() {
    setOpen(true);
  }

  return (
    <div>
      <div className="dropdown absolute relative flex h-8 w-6 items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className=" flex items-center">
              <AiOutlineMore className="h-5 w-5" />
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
            <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-background"
                    } group flex w-full items-center  px-2 py-2 text-sm`}
                    onClick={() => router.push(`/product/edit/${id}`)}
                  >
                    <AiOutlineEdit className="mr-2 fill-kym2" />
                    Editar
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={confirmAction}
                    className={`${
                      active && "bg-background"
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
          <div className="w-1/3 rounded-md bg-white">
            <h1 className="rounded-t-md bg-red-500 py-2 text-center text-lg font-bold text-white">
              Eliminar Producto
            </h1>
            <p className="m-3">
              <span className="font-bold">¡Atención!</span>
            </p>
            <p className="m-3">
              Estás apunto de eliminar este elemento de la web, esta acción es
              irreversible.
            </p>
            <p className="m-3 mt-4 text-center">
              ¿Estás seguro de que quieres continuar?
            </p>
            <div className="flex justify-end">
              <button
                className="mb-3 mt-5 rounded-md bg-button py-1 px-2 text-white hover:bg-button_hover"
                onClick={AcceptHandler}
              >
                Confirmar
              </button>
              <button
                className="m-3  mt-5 rounded-md border border-button bg-transparent px-3 hover:border-transparent hover:bg-button_hover hover:text-white"
                onClick={cancelHandler}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default DotMenu;
