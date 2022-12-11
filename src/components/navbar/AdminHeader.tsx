import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";

function AdminHeader() {
  return (
    <nav
      className="
        navbar-expand-lg
        navbar-light navbar
        relative
        flex
        items-center
        justify-between px-6
      "
    >
      <div className="flex flex-row">
        <div className="dropdown relative flex h-10 w-8 items-center">
          <Menu as="div" className="realative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center">
                <BsFillPersonFill className="h-6 w-6 fill-base-content" />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y  rounded-md bg-white shadow-lg">
              <Link href={`/`}>
                <Menu.Item>
                  <button
                    className="flex w-full flex-row px-5 py-3 text-kym4 "
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <TbLogout className="mr-2 h-6 w-6" />
                    Cerrar sesión
                  </button>
                </Menu.Item>
              </Link>
            </Menu.Items>
            {/* </Transition> */}
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
