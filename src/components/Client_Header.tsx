import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

import { trpc } from "../utils/trpc";

function Client_Header() {
  const { data: allCartProduct } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = allCartProduct?.productList.length ?? 0;

  const { data: session } = useSession();
  let cartIcon = null;

  if (session?.user?.role != "admin") {
    cartIcon = (
      <div className="relative mr-5 flex cursor-pointer items-center">
        <Link href={"/cart"}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="shopping-cart"
            className="w-8"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
            ></path>
          </svg>
        </Link>
        <span className="absolute -mt-7 ml-7 h-5 w-5 rounded-full bg-gray-700 pt-0.5 pl-1.5 text-xs font-bold text-white">
          {numberCartProducts}
        </span>
      </div>
    );
  }

  return (
    <nav
      className="
        navbar
        navbar-expand-lg navbar-light
        relative
        flex
        items-center
        justify-between px-6
      "
    >
      <div className="flex flex-row">
        {cartIcon}

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
      </div>
    </nav>
  );
}

export default Client_Header;
