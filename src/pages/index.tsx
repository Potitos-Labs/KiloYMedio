import router from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Layout from "../components/Layout";
// import { trpc } from "@utils/trpc";

const Home: NextPage = () => {
  const [slide, setslide] = useState(1);
  function incrementSlide() {
    slide == 4 ? setslide(1) : setslide(slide + 1);
  }
  function decrementSlide() {
    slide == 1 ? setslide(4) : setslide(slide - 1);
  }
  // const listProduct: string[] = [
  //   "clapa6399001sh9ual83uh3um",
  //   "clapa63vg0022h9ua3lav64sl",
  //   "clapa65k7003gh9uamzi35eyw",
  //   "clapa69gt006sh9ua9wc78qq2",
  // ];
  // const { data: Product1 } = trpc.product.getById.useQuery({ id });

  return (
    <Layout>
      <Head>
        <title>Kilo y medio</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="carousel h-screen w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <Image src="/img/fondo1.png" width="2000" height="300" />
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Image src="/img/fondo2.png" width="2000" height="300" />
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Image src="/img/fondo3.png" width="2000" height="300" />
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <Image src="/img/fondo4.png" width="2000" height="300" />
        </div>
        <div className="border-#F8F3ED absolute right-10 bottom-20 z-40 flex flex-row items-center rounded-full border-[2px] py-3 px-6">
          <a onClick={decrementSlide} href={`#slide${slide}`}>
            <BsArrowLeft color="#F8F3ED" />
          </a>
          <p className="px-2 text-[#F8F3ED]">
            {" "}
            <span className="font-semibold">0{slide}</span> / 04
          </p>
          <a onClick={incrementSlide} href={`#slide${slide}`}>
            <BsArrowRight color="#F8F3ED" />
          </a>
        </div>
        <button
          onClick={() => {
            return router.push(`/product`);
          }}
          className="bottom- absolute left-10 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold"
        >
          explorar tienda
          <BsArrowRight />
        </button>
      </div>
      <div className="z-10 w-full bg-base-100">
        <div className="collapse w-full rounded-t-xl bg-base-100">
          <input type="checkbox" />
          <div className="collapse-title flex justify-between text-xs text-black">
            <p className="ml-4">Desliza hijo de puta</p>
          </div>
          <div className="collapse-content text-xs text-black">
            <p className=" pt-4 text-2xl">
              Kilo y media es una tienda sostenible, comprometida y cercana que
              ofrece productos orgánicos a granel, libres de plásticoy de
              contaminación cruzada.
            </p>
            <div className="flex w-full justify-end">
              <Image src="/img/bolsa.png" width="945" height="744" />
            </div>
            <div className="w-full">
              <p className="font-raleway text-2xl">Productos destacados</p>
            </div>
            <div className="w-full">
              <p className="font-raleway text-2xl">Nuestros objetivos</p>
              <p className="p-8 text-base">
                Si algo nos diferencia como tienda, es el compromiso que tenemos
                con la salud de nuestros clientes. Cada día apostamos por
                mejorar su bienestar y por ello, organizamos nuestros productos
                de manera que no haya contaminación cruzada, utilizando para
                cada producto un utensilio específico. Además, al crear tu
                perfil puedes indicar tus alergias o intolerancias y a nosotros
                nos aparecerá cuando compres un producto.
              </p>
            </div>
            <div className="flex w-full justify-start">
              <Image src="/img/bolas.png" width="500" height="300" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
