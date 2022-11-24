import Link from "next/link";
import React from "react";

import NavBar from "./navbar/NavBar";

interface HeaderProps {
  bgLight: boolean;
  textDark: boolean;
}

const Header = ({ bgLight, textDark }: HeaderProps) => {
  const bgColor = bgLight ? "bg-base-100" : "bg-transparent absolute";
  const textColor = textDark ? "text-base-content" : "text-base-100";

  return (
    <div className={`${bgColor} ${textColor} z-20 w-full pb-6`}>
      <div className="mx-6 flex flex-shrink-0 items-center justify-between">
        <div>
          <NavBar></NavBar>
        </div>
        <Link href={`/`}>
          <h3 className="hidden w-[200px] cursor-pointer font-raleway text-lg lg:flex">
            kilo y medio
          </h3>
        </Link>
        <div>
          <Link href={`/`}>
            <h3 className="absolute left-20 top-8 w-[160px] cursor-pointer font-raleway text-lg lg:hidden">
              kilo y medio
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
