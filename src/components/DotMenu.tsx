import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const DotMenu = ({ id }: { id: string }) => {
  return (
    <div>
      <div className="dropdown relative flex h-8 w-6 items-center">
        <Menu as="div" className="realative inline-block text-left">
          <div>
            <Menu.Button className=" flex items-center">
              <AiOutlineMore />
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? " bg-button text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineEdit className="mr-2" />
                    Editar
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-button text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineDelete className="mr-2" />
                    Eliminar
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default DotMenu;
