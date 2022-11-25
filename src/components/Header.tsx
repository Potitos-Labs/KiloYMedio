import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NavBar from "./navbar/NavBar";
import NavBarClient from "./navbar/NavBarClient";
import NavBarAdmin from "./navbar/NavBarAdmin";
import router from "next/router";

interface HeaderProps {
  bgLight: boolean;
  textDark: boolean;
}

const Header = ({ bgLight, textDark }: HeaderProps) => {
  const bgColor = bgLight
    ? "bg-base-100"
    : "bg-transparent absolute w-screen -mx-9";
  const textColor = textDark ? "text-base-content" : "text-base-100";

  const { data: session } = useSession();

  return (
    <div
      className={`${bgColor} ${textColor} z-20 w-full justify-between rounded-b-2xl`}
    >
      <div className="mx-4 flex items-center justify-between sm:mx-24">
        <div className="lg:hidden">
          <Image
            src="/img/logopequeño.png"
            alt="not found"
            width="25"
            height="30"
            onClick={() => router.push("/")}
          ></Image>
        </div>

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
