import Link from "next/link";
import React from "react";
import Image from "@components/ui/Image";
import NavBar from "./navbar/NavBar";
import NavBarClient from "./navbar/NavBarClient";
import router from "next/router";
import clsx from "clsx";

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
      <div
        className={clsx(
          "absolute left-8 flex cursor-pointer lg:hidden",
          textDark ? "top-1" : "top-2",
        )}
      >
        <Image
          src={
            textDark
              ? "/api/images/site/5fbae0fb-e32a-13de-04e8-d34d7ddcbfe1.svg"
              : "/api/images/site/05554c31-941e-1ec9-d06f-5d249aa7e534.svg"
          }
          alt="not found"
          className=""
          width="40"
          height="50"
          onClick={() => router.push("/")}
        ></Image>
      </div>
      <div className="mx-4 flex items-center justify-end sm:mx-10 lg:justify-between">
        <div className="basis-1/2 lg:basis-1/3">
          <NavBarClient textDark={textDark} />
        </div>
        <div className="grid place-items-center items-center lg:basis-1/3">
          <Link href={`/`}>
            <h3 className="my-3 hidden w-[180px] cursor-pointer py-2 font-raleway text-lg lg:flex">
              <Image
                src={
                  textDark
                    ? "/api/images/site/55879e0a-bc75-fb5b-828a-95dcb13cd2e8.svg"
                    : "/api/images/site/0887ec3f-5dbf-0b89-9a4c-1beead0bf0d1.svg"
                }
                width={180}
                height={24}
                alt="kilo y medio"
              ></Image>
            </h3>
          </Link>
        </div>
        <div className="grid place-items-end lg:basis-1/3">
          <NavBar textDark={textDark}></NavBar>
        </div>
      </div>
    </div>
  );
};

export default Header;
