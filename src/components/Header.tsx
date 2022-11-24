import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

import NavBar from "./navbar/NavBar";
import NavBarClient from "./navbar/NavBarClient";
import NavBarAdmin from "./navbar/NavBarAdmin";

interface HeaderProps {
  bgLight: boolean;
  textDark: boolean;
}

const Header = ({ bgLight, textDark }: HeaderProps) => {
  const bgColor = bgLight ? "bg-base-100" : "bg-transparent absolute";
  const textColor = textDark ? "text-base-content" : "text-base-100";

  const { data: session } = useSession();

  return (
    <div className={`${bgColor} ${textColor} z-20 rounded-b-2xl`}>
      <div className="mx-6 flex items-center justify-between">
        {session?.user?.role != "admin" ? <NavBarClient /> : <NavBarAdmin />}
        <Link href={`/`}>
          <h3 className="my-5 hidden w-[180px] cursor-pointer font-raleway text-lg lg:flex">
            kilo y medio
          </h3>
        </Link>
        <NavBar></NavBar>
      </div>
    </div>
  );
};

export default Header;
