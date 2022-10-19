import CheckoutForm from "../components/payment/CheckoutForm";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import PaymentGateway from "../components/payment/PaymentGateway";
import { useMultistepFrom } from "../components/payment/useMultistepForm";
import { Stringifier } from "postcss";

type FormData = {
  firstName: string;
  surName: string;
  city: string;
  address: string;
  facturationAddress: string;
  postalCode: string;
  creditCardNumber: string;
  CVV: string;
  expirationDate: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  surName: "",
  city: "",
  address: "",
  facturationAddress: "",
  postalCode: "",
  creditCardNumber: "",
  CVV: "",
  expirationDate: "",
};

const Checkout = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const { data: myCart } = trpc.useQuery(["cart.getAllCartProduct"]);
  const { data: session } = useSession();
  let display = null;

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepFrom([
      // eslint-disable-next-line react/jsx-key
      <CheckoutForm {...data} updateFields={updateFields} />,
      // eslint-disable-next-line react/jsx-key
      <PaymentGateway {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Sucessful Account Creation");
  }

  if (session) {
    display = (
      <div className="pl-3">
        <h1 className="pb-6 text-xl">Información de contacto</h1>
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
          <h1 className="col-end-1 pl-3 text-xl">Información de contacto</h1>
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
        <div className="mt-12 grid grid-cols-[65%_35%]">
          <section>
            {/*Contact info*/}
            <div className="mx-20 h-full">
              <div>{display}</div>
              <form onSubmit={onSubmit}>
                <div className="grid py-10">
                  {step}
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      gap: ".5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {!isFirstStep && (
                      <button
                        type="button"
                        onClick={back}
                        className="border-none bg-button px-3 py-1 font-bold text-white hover:bg-button_hover"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      className="border-none bg-button px-3 py-1 font-bold text-white hover:bg-button_hover "
                    >
                      {!isLastStep ? "Next" : "Finish"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
          {/*End Contact info*/}

          {/* Bill */}
          <div className="m-0 mr-12 ml-6 grid h-full gap-4">
            <div className="border-2 border-solid border-black">
              <div className="flex flex-col">
                <div className="bg-gray-400 pb-3">
                  <h1 className="pt-3 pl-3 text-3xl font-bold">Factura</h1>
                </div>
                <section>
                  {/* Bill -> Products */}
                  <h2 className="p-3 text-xl font-bold">Productos:</h2>
                  <div className="m-0 grid gap-4 pl-6 pr-3">
                    {myCart ? (
                      myCart.map((cartProduct) => (
                        <div key={cartProduct.productId}>
                          <div className="grid grid-cols-[50%_30%_20%] items-center">
                            <div className="capitalize">
                              {cartProduct.product.name}
                            </div>
                            <div>{cartProduct.amount} gr</div>
                            <div className="grid justify-end">Precio</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-right">Cargando...</p>
                    )}
                  </div>
                </section>
                {/* End Bill -> Products */}
                {/* Bill -> Shipping */}
                <div className="grid grid-cols-[80%_20%] items-center">
                  <h2 className="p-3 text-xl font-bold">Gastos de Envío:</h2>
                  <p className="grid justify-end py-3 pr-3">Gratuito</p>
                </div>
                {/* End Bill -> Shipping */}
                {/* Bill -> Summary */}
                <section>
                  <hr className="border-1.5 mx-3 border-black"></hr>
                  <div className="grid grid-cols-2 items-center px-3 pt-3">
                    <h2 className="text-xl font-bold">IVA:</h2>
                    <div className="grid justify-end">Precio</div>
                    <h2 className="text-xl font-bold">Total:</h2>
                    <div className="grid justify-end">Precio</div>
                  </div>
                </section>
                {/* End Bill -> Summary */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Grid */}
    </Layout>
  );
};

export default Checkout;
