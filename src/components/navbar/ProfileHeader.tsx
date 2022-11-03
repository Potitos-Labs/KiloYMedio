import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

export default function ProfileHeader() {
  return (
    <div className="dropdown relative flex h-10 w-8 items-center">
      <Menu as="div" className="realative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center">
            <BsFillPersonFill className="h-11 w-11 fill-white" />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <Menu.Item>
              <Link href={`/profile`}>
                <a className="flex flex-row px-5 py-3 text-kym4 hover:bg-button hover:text-white">
                  <CgProfile className="mr-2 h-6 w-6" />
                  Ver perfil
                </a>
              </Link>
            </Menu.Item>
            <Link href={`/`}>
              <Menu.Item>
                <button
                  className="flex w-full flex-row px-5 py-3 text-kym4 hover:rounded-md hover:bg-button hover:text-white"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <TbLogout className="mr-2 h-6 w-6" />
                  Cerrar sesión
                </button>
              </Menu.Item>
            </Link>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
