import { IoMdSend } from "react-icons/io";
import Header from "./Header";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header></Header>
      <main className="absolute w-full">
        {children}
        <div className=" grid w-full grid-cols-[30%_70%] bg-[#212529] text-white">
          <div className="grid-cols grid">
            <div className="py-16 pl-5">
              <p>lunes-viernes. 9:30-18:30</p>
              <p>sábados. 9:30-14:30</p>
            </div>
            <div className="pb-14 pl-5">
              <p>
                suscríbete a boletin informativo - descubre nuestros descuentos
                para recibir regalos
                <div className="grid w-auto grid-cols-[90%_10%] rounded-md bg-white p-3 align-middle">
                  <input type="text" placeholder="tucorreo@gmail.com" />
                  <div className=" w-auto rounded-sm bg-[#212529] p-1">
                    <IoMdSend color="white" />
                  </div>
                  <IoMdSend color="white" />
                </div>
              </p>
            </div>
          </div>
          <div className="grid-cols grid">
            <h1>info@Kiloymedio.com</h1>
            <p>nuestra tienda</p>
            <p>salud y bienestar</p>
            <p>iniciar sesión</p>
            <p>registrase</p>
          </div>
        </div>
      </main>
    </div>
  );
}
