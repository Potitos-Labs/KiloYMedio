import { useState } from "react";
import Image from "next/image";
import { trpc } from "@utils/trpc";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import router from "next/router";
import Product from "@components/product/Product";
import { HiArrowNarrowRight } from "react-icons/hi";

function ClientePage() {
  const [slide, setslide] = useState(1);
  const [color, setColor] = useState("from-[#f1889f]");
  function incrementSlide() {
    slide == 4 ? setslide(1) : setslide(slide + 1);
    changeBgColor();
  }
  function decrementSlide() {
    slide == 1 ? setslide(4) : setslide(slide - 1);
    changeBgColor();
  }
  function changeBgColor() {
    if (slide == 1) setColor("from-[#f1889f]");
    else if (slide == 2) setColor("from-[#21cf84]");
    else if (slide == 3) setColor("from-[#7b61ff]");
    else setColor("from-[#a6806D]");
  }

  const { data } = trpc.product.getAllProducts.useQuery();
  const listProduct = data?.slice(0, 4);

  return (
    <div className={`bg-gradient-to-b ${color} to-base-content`}>
      <div className="carousel h-screen w-full overflow-hidden">
        <div
          id="slide1"
          className="carousel-item relative w-full justify-center bg-primary pb-20"
        >
          <div className="z-10 mt-[250px] ml-6 -mr-[380px] hidden text-base-100 md:block xl:mt-[380px] xl:ml-10 xl:-mr-[350px]">
            <p className="font-raleway md:text-xl lg:text-3xl">ECOLÓGICO</p>
            <p>Nuestra tienda está comprometida con el medioambiente.</p>
          </div>
          <Image
            src="/img/mermeladaKM.png"
            objectFit="cover"
            width="900"
            height="300"
            alt="notfound"
          />
        </div>
        <div
          id="slide2"
          className="carousel-item relative w-full justify-center bg-secondary"
        >
          <Image
            src="/img/paqueteKM.png"
            objectFit="cover"
            width="900"
            height="300"
            alt="notfound"
          />
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Image
            src="/img/fondo3.png"
            width="2000"
            height="300"
            alt="notfound"
          />
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <Image
            src="/img/fondo4.png"
            width="2000"
            height="300"
            alt="notfound"
          />
        </div>
        <div className="absolute right-10 bottom-20 z-40 flex flex-row items-center rounded-full border-[2px] border-base-100 py-3 px-6">
          <a onClick={decrementSlide} href={`#slide${slide}`}>
            <BsArrowLeft className="text-base-100" />
          </a>
          <p className="px-2 text-base-100">
            {" "}
            <span className="font-semibold">0{slide}</span> / 04
          </p>
          <a onClick={incrementSlide} href={`#slide${slide}`}>
            <BsArrowRight className="text-base-100" />
          </a>
        </div>
        <button
          onClick={() => {
            return router.push(`/product`);
          }}
          className="absolute bottom-20 left-10 flex items-center gap-2 rounded-full bg-base-100 px-6 py-3 font-satoshiBold"
        >
          explorar tienda
          <HiArrowNarrowRight className="mt-0.5" />
        </button>
      </div>
      <div className="relative z-0 mx-4">
        <div className="absolute -top-[78px] left-0 flex w-full place-content-center px-[24px]">
          <Image
            src="/img/ellipse.svg"
            alt=""
            className="-z-10 select-none"
            width={"300%"}
            height={"200%"}
            layout="fixed"
            objectFit="contain"
          />
          <p className="absolute top-12 h-12 font-satoshiBold text-xs">
            saber más
          </p>
        </div>
        <div className="rounded-box bg-base-100 px-14 pt-6 pb-0.5 text-xs text-base-content">
          <p className="text-lg md:text-xl lg:text-2xl">
            kilo y medio es una tienda sostenible, comprometida y cercana, que
            ofrece productos orgánicos a granel, libres de plástico y de
            contaminación cruzada.
          </p>
          <div className="flex w-full justify-end">
            <Image
              src="/img/bolsa.png"
              width="1000"
              height="750"
              alt="notfound"
            />
          </div>
          <div className="mb-20">
            <p className="mb-10 font-raleway text-2xl">PRODUCTOS DESTACADOS</p>
            <div className="mx-2 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
          <div>
            <p className="mb-10 font-raleway text-2xl">NUESTRO OBJETIVO</p>
            <p className="mb-20 mr-20 text-sm lg:mr-60">
              Si algo nos diferencia como tienda, es el compromiso que tenemos
              con la salud de nuestros clientes. Cada día apostamos por mejorar
              su bienestar y, por ello, organizamos nuestros productos de manera
              que no se produzca contaminación cruzada, utilizando para cada
              producto un utensilio específico. Además, al crear tu perfil,
              puedes indicar tus alergias o intolerancias y a nosotros nos
              aparecerá cuando compres un producto.
            </p>
          </div>
          <div className="ml-2 flex w-full justify-end">
            <Image
              src="/img/bolas.png"
              width="500"
              height="300"
              alt="notfound"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientePage;
