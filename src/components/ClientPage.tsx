import { useState } from "react";
import Image from "next/image";
import { trpc } from "@utils/trpc";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import router from "next/router";
import Product from "@components/product/Product";

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
        <div className="absolute right-10 bottom-20 z-40 flex flex-row items-center rounded-full border-[2px] border-base-100 py-3 px-6">
          <a onClick={decrementSlide} href={`#slide${slide}`}>
            <BsArrowLeft color="base-100" />
          </a>
          <p className="px-2 text-base-100">
            {" "}
            <span className="font-semibold">0{slide}</span> / 04
          </p>
          <a onClick={incrementSlide} href={`#slide${slide}`}>
            <BsArrowRight color="base-100" />
          </a>
        </div>
        <button
          onClick={() => {
            return router.push(`/product`);
          }}
          className="absolute bottom-20 left-10 flex items-center gap-2 rounded-full bg-base-100 px-6 py-3 font-satoshiBold"
        >
          explorar tienda
          <BsArrowRight />
        </button>
      </div>
      <div className="z-10 mx-4  -mt-[60px]   justify-center ">
        <div className="collapse justify-center rounded-xl ">
          <input type="checkbox" />
          <div className="collapse-title -mb-2 flex justify-center rounded-t-full bg-base-100 text-center text-xs text-black">
            <p className="ml-4">pulsa para más información</p>
          </div>
          <div className="collapse-content bg-base-100 text-xs text-black">
            <p className="p-4 text-lg lg:text-xl">
              Kilo y Medio es una tienda sostenible, comprometida y cercana, que
              ofrece productos orgánicos a granel, libres de plástico y de
              contaminación cruzada.
            </p>
            <div className="flex w-full justify-end">
              <Image src="/img/bolsa.png" width="945" height="744" />
            </div>
            <div className="">
              <p className="font-raleway text-2xl">Productos destacados</p>
              <div className="mx-2 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-2">
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
                  <p> no hay productos</p>
                )}
              </div>
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
    </div>
  );
}
export default ClientePage;
