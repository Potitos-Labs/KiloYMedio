import CheckoutForm from "../components/payment/CheckoutForm";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import PaymentGateway from "../components/payment/PaymentGateway";
import { useMultistepFrom } from "../components/payment/useMultistepForm";
import Bill from "../components/payment/Bill";
import { useRouter } from "next/router";
import Popup from "reactjs-popup";
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
  const router = useRouter();

  const [data, setData] = useState(INITIAL_DATA);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const { mutateAsync: createNewOrder } =
    trpc.checkout.createNewOrder.useMutation({
      onSuccess: () => {
        setOpen(true);
      },
    });

  const { data: session } = useSession();
  let display = null;

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
      console.log("");
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
    router.push(`/category`);
  }

  if (session) {
    display = (
      <div className="">
        <h1 className="mb-10 bg-background py-2 pl-3 text-xl">
          Información de contacto
        </h1>
        <div className="flex flex-row items-center gap-5">
          <Image
            src="https://cdn2.iconfinder.com/data/icons/chinese-new-year-and-china-culture-flat/64/china-09-512.png"
            alt="notfound"
            width="50"
            height="50"
            layout="fixed"
            objectFit="cover"
          ></Image>
          <p>
            {session.user?.name} ({session.user?.email})
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    display = (
      <div className="">
        <div className="grid grid-cols-2">
          <h1 className="col-end-1 bg-background py-2 pl-3 text-xl">
            Información de contacto
          </h1>
          <p className="col-end-4">
            ¿Ya tienes cuenta?{" "}
            <span>
              <Link href={`/login`}>Inicia sesión</Link>
            </span>
          </p>
        </div>
        <label className="relative flex w-full flex-col pl-3 pt-8">
          <span className="mb-3">Correo electrónico</span>
          <input
            className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
            type="email"
            name="email"
            pattern="/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/" //comprobar
            placeholder="Correo electrónico"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-5 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
        </label>
      </div>
    );
  }

  return (
    <Layout>
      <section>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-1  px-5 md:grid-cols-[60%_40%]">
          <section>
            {/*Contact info*/}
            <div className="mx-20 h-full">
              <div>{display}</div>
              <form onSubmit={onSubmit}>
                <div className="grid py-10">
                  {step}
                  <div className="mt-4 grid grid-cols-2">
                    <div className="flex justify-start">
                      {!isFirstStep && (
                        <button
                          type="button"
                          onClick={back}
                          className="rounded border border-button bg-transparent py-2 px-4 text-button hover:border-transparent hover:bg-button_hover hover:text-white"
                        >
                          Atrás
                        </button>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        name="Submit"
                        className="rounded-md bg-button px-4 py-2 text-white hover:bg-button_hover"
                      >
                        {!isLastStep
                          ? "Continuar con el pago"
                          : "Finalizar compra"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
          {/*End Contact info*/}
          <Bill showExtras={true} postcode={false}></Bill>
        </div>
      </section>
      {/* End Grid */}
      <Popup open={open} modal closeOnDocumentClick onClose={endTransaction}>
        <div className="fixed inset-0 flex   items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="w-1/3 rounded-md bg-white">
            <h1 className="rounded-t-md bg-kym3 py-2 text-center text-lg font-bold text-white">
              ¡Compra completada!
            </h1>
            <p className="m-3">
              Estimado <span className="font-bold">Cliente</span>,{" "}
            </p>
            <p className="m-3">
              Su pedido ha sido efectuado con éxito y procuraremos que le llegue
              lo más pronto posible.
            </p>
            <p className="m-3 mt-4 text-center">
              ¡Muchísimas gracias por confiar en nosotros! 😊
            </p>
            <div className="flex justify-end">
              <button
                className="m-3 mt-5 rounded-sm bg-button py-1 px-2 font-bold text-white hover:bg-button_hover"
                onClick={endTransaction}
              >
                {" "}
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </Layout>
  );
};

export default Checkout;
