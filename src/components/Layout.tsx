import { IoMdSend } from "react-icons/io";
import Header from "./Header";
import Link from "next/link";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
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
  return (
    <div>
      <Header bgLight={headerBgLight} textDark={headerTextDark}></Header>
      <main className={`${bgColor} w-full`}>
        {children}
        {/* Footer */}
        <div className="bg-base-content text-base-100">
          <h1 className="px-8 py-2 text-lg sm:text-2xl lg:text-right">
            info@Kiloymedio.com
          </h1>
          <div className="grid w-full grid-cols-1 pb-1 sm:grid-cols-2">
            <div className="grid-cols mr-80 grid pl-10">
              <div className="py-16 ">
                <p className="text-xs">lunes-viernes, 9:30-18:30</p>
                <p className="text-xs">sábados, 9:30-14:30</p>
              </div>
              <div className="pb-14">
                <p className="text-sm">
                  suscríbete a boletín informativo - descubre nuestros
                  descuentos para recibir regalos
                </p>
                <div className=" mt-4 grid w-[300px]  grid-cols-[80%_20%] items-center rounded-md bg-white p-2 pt-1">
                  <input
                    type="text"
                    placeholder="tucorreo@gmail.com"
                    className="pt-1 text-start"
                  />
                  <button className=" h-14 w-14 items-center justify-center rounded-lg bg-[#212529] px-3 text-center ">
                    <IoMdSend color="white" size="30" />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid-cols ml-10  grid sm:ml-16">
              <div className="mt-8 mr-10 flex flex-col justify-between py-5 sm:flex-row">
                <p className="py-2 sm:py-0">
                  Tienda física próximamente en Valencia
                </p>
                <p className="py-2 sm:py-0">606796767</p>
              </div>
              <div className="grid grid-cols-1 pt-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Link href="/product">Nuestra tienda</Link>
                  <Link href="/product">Salud y bienestar</Link>
                  <Link href="/login">Iniciar sesión</Link>
                  <Link href="/">Registrarse</Link>
                </div>
                <div className="mr-10 mb-4 flex items-end justify-start gap-3 py-4  sm:mb-14 sm:justify-end sm:py-0">
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <AiFillInstagram
                      color="white"
                      size="30"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <AiOutlineTwitter
                      color="white"
                      size="30"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <BsFacebook
                      color="white"
                      size="30"
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 w-full bg-[#212529] px-2">
            <div className="collapse w-full rounded-t-xl bg-[#31363B]">
              <input type="checkbox" />
              <div className="collapse-title flex justify-between text-xs text-white">
                <p className="ml-4">Política de privacidad</p>
                <p>Política de cookies</p>
                <p>Aviso legal</p>
              </div>
              <div className="collapse-content text-xs text-white">
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
