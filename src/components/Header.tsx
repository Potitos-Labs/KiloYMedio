import Link from "next/link";
import React from "react";

import NavBar from "./navbar/NavBar";

const Header: React.FC = () => {
  return (
    <div className="fixed z-20 w-full bg-header py-6">
      <div className="mx-6 flex flex-shrink-0 items-center justify-between text-white">
        <Link href={`/`}>
          <h3 className="hidden w-[300px] cursor-pointer font-sans text-2xl font-semibold lg:flex">
            Kilo Y Medio
          </h3>
        </Link>
        <div className="lg:w-full">
          <NavBar></NavBar>
        </div>
        <div>
          <Link href={`/`}>
            <h3 className="absolute left-20 top-8 w-full cursor-pointer font-sans text-xl font-semibold lg:hidden">
              Kilo Y Medio
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
