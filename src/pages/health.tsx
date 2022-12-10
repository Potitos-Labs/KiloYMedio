import HealthCard from "@components/healthComponents/HealthCards";
import Layout from "@components/Layout";
import Head from "next/head";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

function health() {
  function scroll() {
    window.scrollTo({
      top: document.getElementById("knowMore")?.offsetLeft,
      behavior: "smooth",
    });
  }
  return (
    <Layout bgColor={""} headerBgLight={false} headerTextDark={false}>
      <Head>
        <title>Kilo y medio</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {/* Color Section */}
        <div className=" relative h-screen w-full overflow-hidden bg-[#7B61FF]">
          <div className="z-50 mt-[128px]  ml-6 text-base-100 sm:ml-16 md:block ">
            <p className="z-10 pl-8 font-raleway text-[36px] md:text-xl lg:text-3xl xl:mr-44">
              ¿SABÍAS QUE...
            </p>
            <p className="z-10 pl-8 text-[28px] md:text-[50px] xl:mr-72 ">
              La gran mayoría de nuestros productos presentan beneficios
              saludables?
            </p>
          </div>
          <div className="absolute -right-4 bottom-0   flex justify-end justify-items-end">
            <Image
              className=""
              src="/img/invertidosGarbanzos.png"
              objectFit="cover"
              width="900"
              height="300"
              alt="not found"
            />
          </div>
        </div>
        {/* End Color Section */}

        {/* 'saber más' Section */}
        <div className="bg-gradient-to-b from-[#7B61FF] to-base-content">
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
            <div className="rounded-box bg-base-100 px-3 pt-28 pb-0.5 text-xs text-base-content sm:px-6">
              <HealthCard
                name="LAS ALBÚMINAS..."
                subText="Son unos componentes que contienen las avellanas, el cual
                    ayuda en nuestro organismo en la regeneración de tejido. Las
                    avellanas proporcionan energía a nuestro cuerpo y son muy
                    recomendadas para personas con problemas de colesterol."
                image="/img/avellanes.png"
              />

              <HealthCard
                name="LAS ALMENDRAS, PISTACHOS Y NUECES..."
                subText="No solo ayudan a mejorar la memoria, sino que su consumo reduce los niveles de estrés de las personas."
                image="/img/frutosSecos.png"
              />

              <HealthCard
                name="EL APIO..."
                subText="Es un alimento carminativo, diurético, tranquilizante y depurativo. Es increíblemente saludable, pero ¡cuidado! Si se padecen problemas graves de riñón es mejor no consumirlo. 
Un buen consejo para que todos podamos disfrutar de sus propiedades es reducir las sales cociendo el apio.
"
                image="/img/apio.png "
              />
              <div className="mb-5 flex justify-end">
                <button className="flex items-center rounded-full border-[1px] border-neutral px-[10px] py-1 font-raleway sm:px-4 md:py-2 md:px-6 md:text-sm ">
                  VER TODO
                  <BsArrowRight fill="neutral" className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* End 'saber más' Section */}
      </div>
    </Layout>
  );
}
export default health;
