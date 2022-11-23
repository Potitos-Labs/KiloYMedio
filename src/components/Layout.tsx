import { IoMdSend } from "react-icons/io";
import Header from "./Header";
import Link from "next/link";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header></Header>
      <main>
        {children}
        <div>
          <div className="grid grid-cols-[50%_50%] bg-[#212529] pb-14 text-white">
            <div className="grid-cols mr-80 grid">
              <div className="py-32 pl-5">
                <p>lunes-viernes. 9:30-18:30</p>
                <p>sábados. 9:30-14:30</p>
              </div>
              <div className="pb-14 pl-5">
                <p>
                  suscríbete a boletín informativo - descubre nuestros
                  descuentos para recibir regalos
                  <div className="mt-4 grid w-auto grid-cols-[80%_20%] items-center rounded-md bg-white p-2 pt-1">
                    <input
                      type="text"
                      placeholder="tucorreo@gmail.com"
                      className="pt-1 text-start"
                    />
                    <div className="items-center rounded-sm bg-[#212529] p-3">
                      <IoMdSend color="white" />
                    </div>
                  </div>
                </p>
              </div>
            </div>
            <div className="grid-cols ml-24 grid">
              <div className="w-full">
                <h1 className="w-full pt-8 text-5xl font-bold ">
                  info@Kiloymedio.com
                </h1>
                <div className="mt-8 mr-10 flex justify-between">
                  <p className="">Tienda física próximamente en Valencia</p>
                  <p className="">606796767</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Link href="/product">nuestra tienda</Link>
                  <Link href="/product">Salud y bienestar</Link>
                  <Link href="/product">Iniciar sesión</Link>
                  <Link href="/product">registrase</Link>
                </div>
                <div className="mx-3 mb-6 flex items-end justify-end gap-3">
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <AiFillInstagram color="white" className="cursor-pointer" />
                  </Link>
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <AiOutlineTwitter
                      color="white"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/eco_pandas/">
                    <BsFacebook color="white" className="cursor-pointer" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 w-full bg-[#212529] px-2">
            <div className="collapse w-full rounded-t-xl bg-[#31363B]">
              <input type="checkbox" />
              <div className="collapse-title flex justify-between text-xs text-white">
                <p>Política de privacidad</p>
                <p>Política de cookies</p>
                <p>Aviso legal</p>
              </div>
              <div className="collapse-content text-white ">
                <p>Aquí irían las políticas</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
