import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavBar from "./navbar/NavBar";
import NavBarClient from "./navbar/NavBarClient";
import router from "next/router";

interface HeaderProps {
  bgLight: boolean;
  textDark: boolean;
}

const Header = ({ bgLight, textDark }: HeaderProps) => {
  const bgColor = bgLight
    ? "bg-base-100"
    : "bg-transparent absolute w-full pt-4 lg:pt-0 -mx-4";
  const textColor = textDark ? "text-base-content" : "text-base-100";

  return (
    <div
      className={`${bgColor} ${textColor} z-20 justify-between rounded-b-3xl p-2 lg:p-0`}
    >
      <div className="absolute left-8 top-4 flex cursor-pointer lg:hidden">
        <Image
          src="/img/logopequeño.png"
          alt="not found"
          width="24"
          height="28"
          onClick={() => router.push("/")}
        ></Image>
      </div>
      <div className="mx-4 flex items-center justify-end sm:mx-10 lg:justify-between">
        <NavBarClient />
        <Link href={`/`}>
          <h3 className="my-3 hidden w-[180px] cursor-pointer font-raleway text-lg lg:flex">
            kilo y medio
          </h3>
        </Link>
        <NavBar></NavBar>
      </div>
    </div>
  );
};

export default Header;
