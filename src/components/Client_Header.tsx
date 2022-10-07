import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

function Client_Header() {
  return (
    <nav
      className="
        relative
        flex flex-wrap
        items-center
        justify-between
        px-6
        py-2
        navbar navbar-expand-lg navbar-light
      "
    >
      <div className="flex-grow lg:flex">
        <div className="relative flex items-center mr-5">
          <a
            className="dropdown-toggle flex items-center"
            href="#"
            id="dropdownCart"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
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
            <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-7 ml-7 py-0 px-1.5">
              1
            </span>
          </a>
          <ul
            className="
              dropdown-menu
              min-w-max
              absolute
              hidden
              bg-white
              text-base
              z-50
              float-left
              py-2
              list-none
              text-left
              rounded-lg
              shadow-lg
              mt-1
              m-0
              bg-clip-padding
              border-none
              left-auto
              right-0
            "
            aria-labelledby="dropdownCart"
          >
            <li>
              <a
                className="
                  dropdown-item
                  text-sm
                  py-2
                  px-4
                  font-normal
                  block
                  w-full
                  whitespace-nowrap
                  bg-transparent
                  text-gray-700
                  hover:bg-gray-100
                "
                href="#"
              >
                Action
              </a>
            </li>
            <li>
              <a
                className="
                  dropdown-item
                  text-sm
                  py-2
                  px-4
                  font-normal
                  block
                  w-full
                  whitespace-nowrap
                  bg-transparent
                  text-gray-700
                  hover:bg-gray-100
                "
                href="#"
              >
                Another action
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center dropdown relative h-10 w-8">
          <Menu as="div" className="realitive inline-block text-left">
            <div>
              <Menu.Button className=" flex items-center">
                <img src="/img/perfil.png" alt="" />
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
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <CgProfile className="mr-2" /> Ver perfil
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        signOut();
                      }}
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <TbLogout className="mr-2" />
                      Cerrar sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Client_Header;
