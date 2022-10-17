const PaymentGateway = () => {
  return (
    <div className="flex w-full flex-wrap gap-3 p-5">
      {/*Nombre*/}

      <label className="relative flex w-full flex-col">
        <span className="mb-3 font-bold">Nombre</span>
        <input
          className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
          type="text"
          name="name"
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

      {/*Apellidos*/}
      <label className="relative flex w-full flex-col">
        <span className="mb-3 font-bold">Apellidos</span>
        <input
          className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
          type="text"
          name="surname"
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

      {/*Localidad*/}
      <label className="relative flex w-full flex-col">
        <span className="mb-3 font-bold">Localidad</span>
        <input
          className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
          type="text"
          name="address"
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
      {/*Direccion*/}
      <label className="relative flex flex-1 flex-col">
        <span className="mb-3 font-bold">Dirección de Facturación</span>
        <input
          className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
          type="text"
          name="address"
          placeholder="Dirección de Facturación"
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

      {/*Codigo postal*/}
      <label className="relative flex flex-1 flex-col">
        <span className="mb-3 flex items-center gap-3 font-bold">
          Código Postal
        </span>
        <input
          className="peer appearance-none rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300  "
          type="number"
          name="card_cvc"
          pattern="^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$"
          placeholder="Código Postal"
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

      {/*Numero de tarjeta de credito*/}
      <label className="relative flex w-full flex-col">
        <span className="mb-3 font-bold">Numero de Tarjeta de Crédito</span>
        <input
          className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
          type="number"
          name="card_number"
          pattern="^[0-9]{16}$"
          placeholder="0000 0000 0000 0000"
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
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </label>

      {/*Fecha de caducidad*/}
      <label className="relative flex flex-1 flex-col">
        <span className="mb-3 font-bold">Fecha de Caducidad</span>
        <input
          className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
          type="text"
          name="expire_date"
          placeholder="MM/YY"
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </label>

      {/*CVV*/}
      <label className="relative flex flex-1 flex-col">
        <span className="mb-3 flex items-center gap-3 font-bold">
          CVC/CVV
          <span className="group relative">
            <span className="absolute -right-2 top-1/2 hidden w-max translate-x-full -translate-y-1/2 transform items-center justify-center bg-black px-2 py-1 text-xs text-white group-hover:flex">
              {" "}
              Hey ceci est une infobulle !
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </span>
        <input
          className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
          type="text"
          name="card_cvc"
          pattern="^[0-9]{3, 4}$"
          placeholder="&bull;&bull;&bull;"
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </label>
    </div>
  );
};

export default PaymentGateway;
