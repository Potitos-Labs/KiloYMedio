import { FormWrapper } from "./FormWrapper";

type CheckOutData = {
  firstName: string;
  surName: string;
  city: string;
  address: string;
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
  updateFields,
}: CheckOutFormProps) => {
  return (
    <div className="flex w-full flex-wrap gap-5 p-3">
      <h1 className="text-xl">Información de envío</h1>

      {/*Nombre y apellidos*/}
      <div className="flex-col-2 relative flex w-full gap-4">
        <label className="relative flex w-full flex-col">
          <span className="mb-3">Nombre</span>
          <input
            className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
            type="text"
            name="name"
            value={firstName}
            onChange={(e) => updateFields({ firstName: e.target.value })}
            placeholder="Nombre"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
            />
          </svg>
        </label>

        <label className="relative flex w-full flex-col">
          <span className="mb-3">Apellidos</span>
          <input
            className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
            type="text"
            name="surname"
            value={surName}
            onChange={(e) => updateFields({ surName: e.target.value })}
            placeholder="Apellidos"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
            />
          </svg>
        </label>
      </div>

      {/*Localidad*/}
      <label className="relative flex w-full flex-col">
        <span className="mb-3">Localidad</span>
        <input
          className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
          type="text"
          name="address"
          value={city}
          onChange={(e) => updateFields({ city: e.target.value })}
          placeholder="Localidad"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"
          />
        </svg>
      </label>

      {/*Dirección y CP*/}
      <div className="flex-col-2 relative flex w-full gap-4">
        <label className="relative flex w-full flex-col">
          <span className="mb-3">Dirección de envío</span>
          <input
            className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
            type="text"
            name="address"
            value={address}
            onChange={(e) => updateFields({ address: e.target.value })}
            placeholder="Calle y número"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"
            />
          </svg>
        </label>

        <label className="relative flex w-full flex-col">
          <span className="mb-3">Código postal</span>
          <input
            className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
            type="string"
            name="cp"
            value={postalCode}
            onChange={(e) => updateFields({ postalCode: e.target.value })}
            placeholder="CP"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default CheckoutForm;
