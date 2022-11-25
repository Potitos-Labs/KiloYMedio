import { IoMdSend } from "react-icons/io";
import Header from "./Header";
import Link from "next/link";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  children: JSX.Element | JSX.Element[];
  bgColor: string;
  headerBgLight: boolean;
  headerTextDark: boolean;
}

export default function Layout({
  children,
  bgColor,
  headerBgLight,
  headerTextDark,
}: Props) {
  const { data: session } = useSession();
  return (
    <div className={`${bgColor} w-full`}>
      <div className="px-4">
        <Header bgLight={headerBgLight} textDark={headerTextDark}></Header>
      </div>
      <main>
        {children}
        {/* Footer */}
        <div className="bg-base-content text-base-100">
          <h1 className="px-8 text-lg lg:text-right">info@kiloymedio.com</h1>
          <div className="grid w-full grid-cols-1 pb-1 sm:grid-cols-2">
            <div className="grid-cols mr-40 grid pl-10">
              <Link href={"https://potitos-labs.github.io/Eco-Panda-Site/"}>
                <Image
                  src="/img/powered.svg"
                  alt=""
                  className="rounded-full"
                  width={300}
                  height={41}
                  layout="fixed"
                  objectFit="contain"
                />
              </Link>
              <div className="py-16">
                <p className="text-xs">lunes-viernes, 9:30-18:30</p>
                <p className="text-xs">sábados, 9:30-14:30</p>
              </div>
              <div className="pb-14">
                <p className="text-sm">
                  suscríbete a boletín informativo - descubre nuestros
                  descuentos para recibir regalos
                </p>
                <div className="mt-4 grid w-[400px] grid-cols-[80%_20%] items-center justify-between gap-4 rounded-md bg-base-100 p-2">
                  <input
                    type="text"
                    placeholder="tucorreo@gmail.com"
                    className="bg-base-100 pl-1 text-base-content"
                  />
                  <button className="h-14 w-14 rounded-lg bg-base-content px-3">
                    <IoMdSend color="base-100" size="30" />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid-cols ml-10 grid sm:ml-20">
              <div className="mt-8 mr-10 flex flex-col justify-between py-5 sm:flex-row">
                <p className="py-2 sm:py-0">
                  TIENDA FÍSICA PRÓXIMAMENTE EN VALENCIA
                </p>
                <p className="py-2 sm:py-0">606 79 67 67</p>
              </div>
              <div className="grid grid-cols-1 pt-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Link href="/product">nuestra tienda</Link>
                  <Link href="/product">salud y bienestar</Link>
                  {!session ? (
                    <Link href="/login">iniciar sesión</Link>
                  ) : (
                    <button
                      className="text-left"
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      cerrar sesión
                    </button>
                  )}
                  {!session && <Link href="/">registrarse</Link>}
                </div>
                <div className="mr-10 mb-4 flex items-end justify-start gap-3 py-4  sm:mb-14 sm:justify-end sm:py-0">
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <AiOutlineTwitter
                      color="base-100"
                      size="30"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <AiFillInstagram
                      color="base-100"
                      size="30"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <BsFacebook
                      color="base-100"
                      size="26"
                      className="mb-0.5 cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 w-full bg-base-content px-4">
            <div className="collapse w-full rounded-t-3xl bg-[#31363B]">
              <input type="checkbox" />
              <div className="collapse-title flex gap-10 text-xs text-base-100">
                <p className="ml-4">Política de privacidad</p>
                <p>Política de cookies</p>
                <p>Aviso legal</p>
              </div>
              <div className="collapse-content text-xs text-base-100">
                <p>Aquí irían las políticas</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer */}
      </main>
    </div>
  );
}
