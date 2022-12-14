// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
import LoadingBallsFullScreen from "@components/ui/LoadingBallsFullScreen";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Popup from "reactjs-popup";

import Layout from "../components/Layout";
import Bill from "../components/payment/Bill";
import CheckoutForm from "../components/payment/CheckoutForm";
import PaymentGateway from "../components/payment/PaymentGateway";
import { useMultistepFrom } from "../components/payment/useMultistepForm";
import { trpc } from "../utils/trpc";

type FormData = {
  firstName: string;
  surName: string;
  fullNamePayment: string;
  city: string;
  address: string;
  facturationAddress: string;
  postalCode: string;
  creditCardNumber: string;
  CVV: string;
  errorMessage: string;
  errorName: string;
  addressCheckBox: boolean;
  homeDelivery: boolean;
  expirationDate: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  surName: "",
  fullNamePayment: "",
  city: "",
  address: "",
  facturationAddress: "",
  postalCode: "",
  creditCardNumber: "",
  CVV: "",
  errorMessage: "",
  errorName: "",
  addressCheckBox: false,
  homeDelivery: true,
  expirationDate: "",
};

const Checkout = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [open, setOpen] = useState(false);

  const { mutateAsync: createNewOrder } =
    trpc.checkout.createNewOrder.useMutation({
      onMutate: () => {
        setPopUpOpen(true);
      },
      onSuccess: () => {
        setTimeout(() => {
          setPopUpOpen(false);
          setOpen(true);
        }, 3000);
      },
    });

  // const { data: session } = useSession();
  // const display = null;

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { step, isFirstStep, isLastStep, back, next } = useMultistepFrom([
    // eslint-disable-next-line react/jsx-key
    <CheckoutForm {...data} updateFields={updateFields} />,
    // eslint-disable-next-line react/jsx-key
    <PaymentGateway {...data} updateFields={updateFields} />,
  ]);

  function isDateExpired(date: string) {
    const actualYear = Number(new Date().getUTCFullYear() - 2000);
    const actuaMonth = Number(new Date().getUTCMonth()) + 1;

    const year = Number(date.substr(3, 4));
    const month = Number(date.substr(0, 2));

    if (actualYear > year || (actualYear == year && month < actuaMonth)) {
      console.log(data.errorMessage);
      updateFields({ errorMessage: "¡La tarjeta está caducada!" });
      return false;
    }
    return true;
  }

  function isNameValid(name: string) {
    const regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;

    if (!regexp.test(name)) {
      updateFields({ errorName: "Introduzca el nombre completo." });
      return false;
    }
    return true;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();

    if (
      isDateExpired(data.expirationDate) &&
      isNameValid(data.fullNamePayment)
    ) {
      createNewOrder({
        shipmentAddress: data.homeDelivery
          ? `${data.address}, ${data.city}, ${data.postalCode}`
          : "Recogida en Tienda",
      });
    }
  }

  function endTransaction() {
    setOpen(false);
  }

  // if (session) {
  //   display = (
  //     <div>
  //       <h1 className="font-raleway text-lg lg:text-2xl">
  //         Información de contacto
  //       </h1>
  //       <div className="flex flex-row items-center gap-5">
  //         <Image
  //           src="https://cdn2.iconfinder.com/data/icons/chinese-new-year-and-china-culture-flat/64/china-09-512.png"
  //           alt="notfound"
  //           width="50"
  //           height="50"
  //           layout="fixed"
  //           objectFit="cover"
  //         ></Image>
  //         <p>
  //           {session.user?.name} ({session.user?.email})
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!session) {
  //   display = (
  //     <div>
  //       <div className="grid grid-cols-2 items-center bg-background pr-4">
  //         <h1 className="col-end-1 py-2 pl-3 text-xl">
  //           Información de contacto
  //         </h1>
  //         <p className="col-end-4">
  //           ¿Ya tienes cuenta?{" "}
  //           <span>
  //             <Link href={`/login`}> Inicia sesión</Link>
  //           </span>
  //         </p>
  //       </div>
  //       <label className="relative mx-1 flex w-full flex-col pl-3 pt-8">
  //         <span className="mb-3">Correo electrónico</span>
  //         <input
  //           className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
  //           type="email"
  //           name="email"
  //           required
  //           pattern="/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/" //comprobar
  //           placeholder="Correo electrónico"
  //         />
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="absolute bottom-0 left-5 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
  //           <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
  //         </svg>
  //       </label>
  //     </div>
  //   );
  // }

  const [popUpOpen, setPopUpOpen] = useState(false);

  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <section>
        {/* Grid */}
        <LoadingBallsFullScreen open={popUpOpen} setOpen={setPopUpOpen} />
        <div className="mt-12 grid grid-cols-1 gap-4 px-5 xl:grid-cols-[60%_40%] xl:gap-0">
          <section className="rounded-xl bg-base-100 py-10 px-6 sm:px-10 xl:mr-2 2xl:p-20">
            {/*Contact info*/}
            <div className="">
              {/* <div>{display}</div> */}
              <form onSubmit={onSubmit}>
                <div className="m-0 mt-4 grid gap-4">
                  {step}
                  <div className="mt-4 grid grid-cols-2">
                    <div className="flex justify-start">
                      {!isFirstStep && (
                        <button
                          type="button"
                          onClick={back}
                          className="btn rounded-full border-[1px] border-neutral bg-base-100 font-raleway text-xs text-neutral hover:bg-transparent sm:text-sm"
                        >
                          Atrás
                        </button>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        name="Submit"
                        className="btn rounded-full font-raleway text-xs text-base-100 sm:text-sm"
                      >
                        {!isLastStep ? "Continuar" : "Finalizar compra"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
          {/*End Contact info*/}
          <section className="rounded-xl bg-base-100 p-6 sm:p-14 lg:ml-2 2xl:p-20">
            <Bill showExtras={true} postcode={false}></Bill>
          </section>
        </div>
      </section>
      {/* End Grid */}
      <Popup open={open} modal closeOnDocumentClick onClose={endTransaction}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="w-4/5  rounded-xl bg-white sm:w-2/5">
            <h1 className="rounded-t-xl bg-neutral py-2 text-center font-raleway text-lg text-base-100">
              ¡Compra completada!
            </h1>
            <p className="m-3">Estimado cliente, </p>
            <p className="m-3">
              Su pedido ha sido efectuado con éxito y procuraremos que llegue lo
              más pronto posible.
            </p>
            <p className="m-3 mt-4 text-center">
              ¡Muchísimas gracias por confiar en nosotros! 😊
            </p>
            <div className="flex justify-end">
              <Link href="/">
                <button
                  className="btn m-3 mt-5 rounded-full border-none px-5 font-raleway text-xs text-base-100"
                  onClick={endTransaction}
                >
                  {" "}
                  Aceptar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Popup>
    </Layout>
  );
};

export default Checkout;
