type CheckOutData = {
  firstName: string;
  surName: string;
  city: string;
  address: string;
  homeDelivery: boolean;
  postalCode: string;
};

type CheckOutFormProps = CheckOutData & {
  updateFields: (fields: Partial<CheckOutData>) => void;
};

const CheckoutForm = ({
  firstName,
  surName,
  city,
  address,
  postalCode,
  homeDelivery,
  updateFields,
}: CheckOutFormProps) => {
  function showShippingInfo() {
    updateFields({ homeDelivery: true });
  }

  function hideShippingInfo() {
    updateFields({ homeDelivery: false });
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-raleway text-lg lg:mb-2 lg:text-2xl">
        Datos de envío
      </h1>

      {/*Nombre y apellidos*/}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          className="input input-bordered h-[60px] rounded-[30px] border-base-300 text-sm text-base-300"
          type="text"
          name="name"
          required
          value={firstName}
          pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,50}"
          // title="No se permiten dígitos ni caracteres especiales."
          onChange={(e) => updateFields({ firstName: e.target.value })}
          placeholder="Nombre"
        />

        <input
          className="input input-bordered h-[60px] rounded-[30px] border-base-300 text-sm text-base-300"
          type="text"
          required
          name="surname"
          value={surName}
          pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,50}"
          title="No se permiten dígitos ni caracteres especiales."
          onChange={(e) => updateFields({ surName: e.target.value })}
          placeholder="Apellidos"
        />
      </div>

      <div className="w-full rounded-md border border-neutral">
        <div>
          <label className="label ml-2 cursor-pointer justify-start">
            <input
              type="radio"
              name="delivery"
              id="radio-pickUp"
              className="radio radio-sm"
              checked={!homeDelivery}
              onClick={hideShippingInfo}
            />
            <span className="ml-2 text-sm">Recogida en tienda</span>
          </label>
          <hr className="flex border-spacing-0 border-black border-opacity-30"></hr>
          <label className="label ml-2 cursor-pointer justify-start">
            <input
              type="radio"
              name="delivery"
              id="radio-pickUp"
              className="radio radio-sm"
              checked={homeDelivery}
              onClick={showShippingInfo}
            />
            <span className="ml-2 text-sm">Envío a domicilio</span>
          </label>
        </div>
        {/*Localidad, Dirección y CP*/}
        <div className={`${homeDelivery ? "visible p-5" : "hidden"}`}>
          <label className="relative flex flex-col">
            <input
              className="input rounded-[30px] border-[1px] border-neutral py-2 pl-10 pr-2 text-sm"
              type="text"
              name="address"
              value={address}
              required={homeDelivery}
              onChange={(e) => updateFields({ address: e.target.value })}
              placeholder="Dirección"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-base-300 peer-placeholder-shown:text-gray-300"
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
          <div className="mt-4 flex gap-4 ">
            <div className="relative w-1/2 flex-initial">
              <label>
                <input
                  className="input  w-full rounded-[30px] border-[1px] border-neutral py-2 pl-10 pr-2 text-sm"
                  type="text"
                  required={homeDelivery}
                  name="address"
                  value={city}
                  pattern={
                    homeDelivery
                      ? "^[a-zA-ZÀ-ÿ\u00f1\u00d1s]{2,50}"
                      : "^[^]{0,500}"
                  }
                  onChange={(e) => updateFields({ city: e.target.value })}
                  placeholder="Localidad"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-base-300 peer-placeholder-shown:text-gray-300"
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
            </div>
            <div className="relative w-1/2 flex-initial">
              <label className="">
                <input
                  className="input w-full rounded-[30px] border-[1px] border-neutral py-2 pl-10 pr-2 text-sm"
                  type="tel"
                  name="cp"
                  value={postalCode}
                  required={homeDelivery}
                  maxLength={5}
                  pattern={
                    homeDelivery
                      ? "^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$"
                      : "^[^]{0,500}"
                  }
                  onChange={(e) => updateFields({ postalCode: e.target.value })}
                  placeholder="CP"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-base-300 peer-placeholder-shown:text-gray-300"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
