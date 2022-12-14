import { useState } from "react";
import Image from "next/image";
import { trpc } from "@utils/trpc";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import router from "next/router";
import Product from "@components/product/Product";
import { HiArrowNarrowRight } from "react-icons/hi";

function ClientePage() {
  const slideColors = [
    { slide: 0, color: "" },
    { slide: 1, color: "from-[#E87B94]" },
    { slide: 2, color: "from-[#21cf84]" },
    { slide: 3, color: "from-[#7b61ff]" },
    { slide: 4, color: "from-[#a6806D]" },
  ];
  console.log(slideColors[1]);
  const [slide, setslide] = useState(1);

  function incrementSlide() {
    slide == 4 ? setslide(1) : setslide(slide + 1);
  }
  function decrementSlide() {
    slide == 1 ? setslide(4) : setslide(slide - 1);
  }

  function scroll() {
    window.scrollTo({
      top: document.getElementById("knowMore")?.offsetLeft,
      behavior: "smooth",
    });
  }

  const { data } = trpc.product.getAllProducts.useQuery();
  const listProduct = data?.slice(0, 4);

  return (
    <div>
      {/* Color Section */}
      <div className="carousel h-screen w-full overflow-hidden">
        <div
          id="slide1"
          className="carousel-item relative w-full justify-center bg-primary pb-20"
        >
          <div className="z-10 mt-[250px] ml-10 -mr-[380px] hidden text-base-100 md:block xl:-ml-4 xl:mt-[300px] xl:-mr-[400px]">
            <p className="font-raleway md:text-xl lg:text-3xl xl:-ml-28">
              ECOLÓGICO
            </p>
            <p className="xl:-ml-28">
              Nuestra tienda está comprometida con el medioambiente.
            </p>
          </div>
          <Image
            src="/img/fondo1.png"
            objectFit="cover"
            width="1200"
            height="300"
            alt="not found"
          />
        </div>
        <div
          id="slide2"
          className="carousel-item relative w-full justify-center bg-secondary pb-20"
        >
          <div className="z-10 mt-[270px] ml-10 -mr-[480px] hidden text-base-100 md:block lg:mt-[160px] xl:-ml-10 xl:mt-[270px]">
            <p className="font-raleway md:text-xl lg:text-3xl xl:-ml-6">
              0 PLÁSTICOS
            </p>
            <p className="w-[480px] xl:-ml-6 xl:w-[550px]">
              Nuestros envases son de materiales reciclados y reutilizables para
              reducir el uso de plástico.
            </p>
          </div>
          <Image
            src="/img/fondo2.png"
            objectFit="cover"
            width="1200"
            height="400"
            alt="not found"
          />
        </div>
        <div
          id="slide3"
          className="carousel-item relative w-full justify-between bg-[#855FFE] pb-20"
        >
          <div className="z-10 mt-[270px] -mr-[380px] ml-10 hidden text-base-100 md:block lg:mt-[160px] xl:mt-[270px] xl:-mr-[300px]">
            <p className="font-raleway md:text-xl lg:text-3xl">PROMOCIÓN</p>
            <p className="ml-1 w-[480px] xl:w-[550px]">
              Por la primera compra por valor superior a 30€ te regalamos una
              tote bag reutilizable.
            </p>
          </div>
          <Image
            src="/img/fondo3.png"
            objectFit="cover"
            width="1200"
            height="300"
            alt="not found"
          />
        </div>
        <div
          id="slide4"
          className="carousel-item relative w-full items-start justify-end bg-base-200 pb-20"
        >
          <div className="z-10 mt-[180px] -mr-[380px] ml-10 hidden text-base-100 md:block lg:mt-[140px] xl:mt-[180px] xl:-mr-[280px]">
            <p className="font-raleway md:text-xl xl:text-2xl">
              0 CONTAMINACIÓN CRUZADA
            </p>
            <p className="w-[480px] xl:w-[550px]">
              Disponemos de un sistema de perfil de alérgenos para que nuestros
              productos no sean contaminados.
            </p>
          </div>
          <Image
            src="/img/fondo4.png"
            objectFit="fill"
            width="900"
            height="600"
            alt="not found"
          />
        </div>
        <div className="absolute right-8 bottom-20 z-40 flex flex-row items-center rounded-full border-[2px] border-base-100 py-2.5 px-6">
          <a
            onClick={decrementSlide}
            href={`#slide${slideColors[slide]?.slide}`}
          >
            <BsArrowLeft className="text-base-100" />
          </a>
          <p className="px-2 text-base-100">
            <span className="hidden font-raleway text-sm sm:inline-flex">
              0{slideColors[slide]?.slide}
            </span>{" "}
            / <span className="hidden sm:inline-flex">04</span>
          </p>
          <a
            onClick={incrementSlide}
            href={`#slide${slideColors[slide]?.slide}`}
          >
            <BsArrowRight className="text-base-100" />
          </a>
        </div>
        <button
          onClick={() => {
            return router.push(`/product`);
          }}
          className="absolute bottom-20 left-8 z-10 flex items-center gap-2 rounded-full bg-base-100 px-6 py-3 font-satoshiBold"
        >
          explorar tienda
          <HiArrowNarrowRight className="mt-0.5" />
        </button>
      </div>
      {/* End Color Section */}

      {/* 'saber más' Section */}
      <div
        className={`bg-gradient-to-b ${slideColors[slide]?.color} to-base-content`}
      >
        <div className="relative z-0 mx-4">
          {/* Elipse */}
          <div className="absolute -top-[78px] left-0 flex w-full place-content-center px-[24px]">
            <Image
              src="/img/ellipse.svg"
              alt="not found"
              className="-z-10 select-none"
              width={"300%"}
              height={"200%"}
              layout="fixed"
              objectFit="contain"
            />
            <p
              id="knowMore"
              onClick={scroll}
              className="absolute top-12 h-12 cursor-pointer select-none font-satoshiBold text-xs"
            >
              saber más
            </p>
          </div>
          {/* End Elipse */}
          <div className="rounded-box flex flex-col bg-base-100 px-8 pt-6 pb-0.5 text-xs text-base-content sm:px-14">
            <p className="text-lg md:text-xl lg:text-2xl">
              kilo y medio es una tienda sostenible, comprometida y cercana, que
              ofrece productos orgánicos a granel, libres de plástico y de
              contaminación cruzada.
            </p>
            <div className="mb-10 flex w-full justify-end">
              <Image
                src="/img/bolsa.png"
                width="1000"
                height="750"
                alt="notfound"
              />
            </div>
            {/* Productos destacados */}
            <div className="mb-14 sm:mb-20 lg:mb-32">
              <p className="mb-10 font-raleway text-lg md:text-xl lg:text-2xl">
                PRODUCTOS DESTACADOS
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {listProduct ? (
                  listProduct.map((e) => {
                    return (
                      <Product
                        product={e}
                        key={e.id}
                        showButtons={false}
                      ></Product>
                    );
                  })
                ) : (
                  <p>no hay productos</p>
                )}
              </div>
            </div>
            {/* End Productos destacados */}
            {/* Objetivo */}
            <div>
              <p className="mb-6 font-raleway text-lg sm:mb-10 md:text-xl lg:text-2xl">
                NUESTRO OBJETIVO
              </p>
              <p className="mb-20 text-sm md:mr-10 lg:mr-60">
                Si algo nos diferencia como tienda, es el compromiso que tenemos
                con la salud de nuestros clientes. Cada día apostamos por
                mejorar su bienestar y, por ello, organizamos nuestros productos
                de manera que no se produzca contaminación cruzada, utilizando
                para cada producto un utensilio específico. Además, al crear tu
                perfil, puedes indicar tus alergias o intolerancias y a nosotros
                nos aparecerá cuando compres un producto.
              </p>
            </div>
            {/* End Objetivo */}
            <div className="ml-2 flex h-40 w-full justify-between gap-4">
              <div className="relative flex w-full items-start justify-start align-top md:w-1/3">
                <Image
                  className=""
                  src="/img/bolas con hashtags1.svg"
                  objectPosition={"left"}
                  layout="fill"
                  objectFit="contain"
                  alt="notfound"
                />
              </div>
              <div className="relative hidden w-1/3 md:flex">
                <Image
                  src="/img/bolas con hashtags2.svg"
                  layout="fill"
                  objectFit="contain"
                  alt="notfound"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End 'saber más' Section */}
    </div>
  );
}
export default ClientePage;
