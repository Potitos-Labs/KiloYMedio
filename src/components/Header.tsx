import Link from "next/link";
import React from "react";

import NavBar from "./navbar/NavBar";

const Header: React.FC = () => {
  return (
    <div className="fixed z-10 w-full bg-header py-6">
      <div className="mx-6 flex flex-shrink-0 items-center justify-between text-white">
        <Link href={`/`}>
          <h3 className="w-[300px] cursor-pointer font-sans text-2xl font-semibold">
            Kilo Y Medio
          </h3>
        </Link>
        <div className="w-full">
          <NavBar></NavBar>
        </div>
      </div>
    </div>
  );
};

export default Header;
