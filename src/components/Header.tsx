import Link from "next/link";
import React from "react";

import NavBar from "./navbar/NavBar";

const Header: React.FC = () => {
  return (
    <div className="z-20 w-full bg-transparent pb-6">
      <div className="mx-6 flex flex-shrink-0 items-center justify-between text-base-content">
        <Link href={`/`}>
          <h3 className="hidden w-[300px] cursor-pointer font-raleway text-lg font-semibold lg:flex">
            Kilo Y Medio
          </h3>
        </Link>
        <div className="lg:w-full">
          <NavBar></NavBar>
        </div>
        <div>
          <Link href={`/`}>
            <h3 className="absolute left-20 top-8 w-[160px] cursor-pointer font-sans text-xl font-semibold lg:hidden">
              Kilo Y Medio
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
