import { FormWrapper } from "./FormWrapper";
import { formatCreditCardNumber, formatExpirationDate } from "./utils";

type AddressData = {
  fullNamePayment: string;
  address: string;
  facturationAddress: string;
  creditCardNumber: string;
  CVV: string;
  errorMessage: string;
  errorName: string;
  addressCheckBox: boolean;
  homeDelivery: boolean;
  expirationDate: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

const PaymentGateway = ({
  fullNamePayment,
  address,
  facturationAddress,
  creditCardNumber,
  CVV,
  expirationDate,
  errorMessage,
  errorName,
  addressCheckBox,
  homeDelivery,
  updateFields,
}: AddressFormProps) => {
  //const date = new Date();
  //const year = date.getUTCFullYear();

  const handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      updateFields({ creditCardNumber: target.value });
    }
    if (target.name === "date") {
      target.value = formatExpirationDate(target.value);
      updateFields({ errorMessage: "" });
      updateFields({ expirationDate: target.value });
    }
    if (target.name === "name") {
      updateFields({ errorName: "" });
      updateFields({ fullNamePayment: target.value });
    }
  };

  const changeAddress = ({ target }: { target: HTMLInputElement }) => {
    updateFields({ addressCheckBox: target.checked });
    if (target.checked) updateFields({ facturationAddress: address });
    else updateFields({ facturationAddress: "" });
  };

  return (
    <div className="flex flex-col gap-8">
      <FormWrapper title="Detalles del pago">
        <div className="pt-5 xl:pt-3">
          <label className="relative flex flex-col">
            <span className="mb-1 text-xs">Número de tarjeta</span>
            <input
              className="peer input input-bordered h-[60px] rounded-[30px] border-base-300 pl-12 text-sm text-base-300 placeholder-gray-300"
              required
              name="number"
              pattern="([0-9]+( [0-9]+)+)"
              type="string"
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
              title="16 dígitos"
              value={creditCardNumber}
              onChange={(e) => handleInputChange({ target: e.target })}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-1 left-1 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M14.781,14.347h1.738c0.24,0,0.436-0.194,0.436-0.435v-1.739c0-0.239-0.195-0.435-0.436-0.435h-1.738c-0.239,0-0.435,0.195-0.435,0.435v1.739C14.347,14.152,14.542,14.347,14.781,14.347 M18.693,3.045H1.307c-0.48,0-0.869,0.39-0.869,0.869v12.17c0,0.479,0.389,0.869,0.869,0.869h17.387c0.479,0,0.869-0.39,0.869-0.869V3.915C19.562,3.435,19.173,3.045,18.693,3.045 M18.693,16.085H1.307V9.13h17.387V16.085z M18.693,5.653H1.307V3.915h17.387V5.653zM3.48,12.608h7.824c0.24,0,0.435-0.195,0.435-0.436c0-0.239-0.194-0.435-0.435-0.435H3.48c-0.24,0-0.435,0.195-0.435,0.435C3.045,12.413,3.24,12.608,3.48,12.608 M3.48,14.347h6.085c0.24,0,0.435-0.194,0.435-0.435s-0.195-0.435-0.435-0.435H3.48c-0.24,0-0.435,0.194-0.435,0.435S3.24,14.347,3.48,14.347"
              />
            </svg>
          </label>
          <div></div>
          <label className="relative mt-4 flex w-full flex-col   ">
            <span className="mb-1 text-xs">Nombre del titular</span>
            <input
              className="peer input input-bordered h-[60px] rounded-[30px] border-base-300 pl-12 text-sm text-base-300 placeholder-gray-300"
              required
              type="text"
              name="name"
              placeholder="Titular de la tarjeta"
              pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,150}"
              title="No se permiten dígitos ni caracteres especiales."
              value={fullNamePayment}
              onChange={(e) => handleInputChange({ target: e.target })}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-1 left-1 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
              />
            </svg>
          </label>
          <label className="m-0 text-sm text-red-700">{errorName}</label>
          <div className="mt-4 grid grid-cols-1 gap-4 pb-2 lg:grid-cols-2">
            <label className="relative flex w-full flex-col">
              <span className="mb-1 text-xs">CVV</span>
              <input
                className="peer input input-bordered h-[60px] rounded-[30px] border-base-300 pl-12 text-sm text-base-300 placeholder-gray-300"
                required
                type="tel"
                placeholder="Código de seguridad"
                maxLength={3}
                pattern="[0-9]{3}"
                title="El CVV sólo tiene 3 dígitos"
                value={CVV}
                onChange={(e) => updateFields({ CVV: e.target.value })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-1 left-1 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"
                />
              </svg>
            </label>

            <div className="m-0 h-6">
              <label className="relative flex w-full flex-col">
                <span className="mb-1 text-xs">Fecha de vencimiento</span>
                <input
                  className="peer input input-bordered h-[60px] rounded-[30px] border-base-300 pl-12 text-sm text-base-300 placeholder-gray-300"
                  required
                  name="date"
                  type="tel"
                  pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
                  placeholder="MM/YY"
                  value={expirationDate}
                  onChange={(e) => handleInputChange({ target: e.target })}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-1 left-1 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                  />
                </svg>
              </label>
              <label className="m-0 text-sm text-red-700">{errorMessage}</label>
            </div>
          </div>
        </div>
      </FormWrapper>
      <div className="mt-12 xl:mt-6">
        <FormWrapper title="Dirección de facturación">
          <div className="mt-5 xl:mt-3">
            <label className="relative flex w-full flex-col">
              <input
                className="peer input input-bordered h-[60px] rounded-[30px] border-base-300 pl-12 text-sm text-base-300 placeholder-gray-300"
                required
                id="iAddress"
                type="text"
                value={facturationAddress}
                placeholder="Dirección"
                onChange={(e) =>
                  updateFields({ facturationAddress: e.target.value })
                }
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-1 left-1 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"
                />
              </svg>
            </label>
            {homeDelivery && (
              <div className="items mr-2 flex items-center justify-end gap-1">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm border-neutral"
                  defaultChecked={addressCheckBox}
                  onChange={(e) => changeAddress({ target: e.target })}
                />
                <label className="text-sm text-neutral">
                  Usar dirección de envío
                </label>
              </div>
            )}
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default PaymentGateway;
