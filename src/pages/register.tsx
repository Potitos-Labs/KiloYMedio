import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

import { trpc } from "../utils/trpc";
import { ISignUp, signUpSchema } from "../utils/validations/auth";

const SignUp: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    shouldUseNativeValidation: true, // need for :invalid tag tailwind
    criteriaMode: "all",
  });

  const { mutateAsync } = trpc.user.client.createNew.useMutation();

  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          router.push("/");
        }
      } catch (error) {
        setEmailAlreadyExists(true);
      }
    },
    [mutateAsync, router],
  );

  const [showPassword, setShowPassword] = useState(false);

  function showHidePassword() {
    setShowPassword((showPassword) => !showPassword);
  }

  // const [matchPassword, setMatchPassword] = useState(false);

  // function passwordMatch(e) {}

  console.log({ errors });
  return (
    <div>
      <main className="flex h-screen flex-col items-center justify-center bg-accent bg-cover bg-no-repeat md:items-end md:bg-[url('/img/fondoRegistrarse.png')]">
        <div className="h-[760px] w-screen rounded-[20px] border-[1px] bg-base-100 md:mr-[70px] md:w-[540px]">
          {/* Text */}
          <div className="text-center">
            <p className="mt-[80px] ml-[30px] mr-[51px] w-[459px] font-raleway text-[43px]">
              ¡Únete a kilo y medio!
            </p>
            <p className="ml-[33px] mr-[17px] mt-[30px] text-left text-sm">
              ¿Ya tienes una cuenta? {""}
              <Link href="/login">
                <b className="cursor-pointer font-satoshiBold">
                  Iniciar sesión
                </b>
              </Link>
              .
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Info */}
            <div className="mt-[74px] flex flex-col items-center gap-[19px]">
              <div className="mx-[30px]">
                <div className="flex flex-row gap-[20px]">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="input input-bordered h-[60px] w-[480px] rounded-[30px] border-base-300 text-sm text-base-300"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="ml-7 -mb-[18px] text-[14px] text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mx-[30px]">
                <div className="flex max-w-[480px]">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="input input-bordered h-[60px] w-[480px] rounded-[30px] border-base-300 text-sm text-base-300"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="ml-7 -mb-[18px] text-[14px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
                {emailAlreadyExists && (
                  <p className="font-semibold text-red-500">
                    El email ya está siendo usado
                  </p>
                )}
              </div>
              <div className="mx-[30px] max-w-[480px]">
                <div className="flex items-center justify-end">
                  <label className="swap absolute mr-[30px] md:ml-[430px]">
                    <input
                      type="checkbox"
                      onClick={() => showHidePassword()}
                    ></input>
                    <IoEyeSharp className="swap-on h-[25px] w-[25px]"></IoEyeSharp>
                    <IoEyeOffSharp className="swap-off h-[25px] w-[25px]"></IoEyeOffSharp>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    id="password"
                    className="input input-bordered h-[60px] w-[480px] rounded-[30px] border-base-300 text-sm text-base-300"
                    {...register("password")}
                  />
                </div>
              </div>
              <div className="mx-[30px] max-w-[480px]">
                <div className="flex items-center justify-end">
                  <label className="swap absolute mr-[30px] md:ml-[430px]">
                    <input
                      type="checkbox"
                      onClick={() => showHidePassword()}
                    ></input>
                    <IoEyeSharp className="swap-on h-[25px] w-[25px]"></IoEyeSharp>
                    <IoEyeOffSharp className="swap-off h-[25px] w-[25px]"></IoEyeOffSharp>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Repetir contraseña"
                    id="passwordConfirm"
                    className="input input-bordered h-[60px] w-[480px] rounded-[30px] border-base-300 text-sm text-base-300"
                    // onChange={(e) => passwordMatch(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className="ml-7 -mb-[48px] text-[14px] text-red-500">
                    {errors.password.message}
                  </p>
                )}
                {/* {!errors.password &&
                  document.getElementById("password") !==
                    document.getElementById("passwordConfirm") && (
                    <p className="ml-7 -mb-[48px] text-[14px] text-red-500">
                      Las contraseñas no coinciden
                    </p>
                  )} */}
              </div>
            </div>
            {/* End Info */}
            {/* Button */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="btn btn-lg mx-[15px] mt-[78px] h-[60px] w-[480px] cursor-pointer text-sm text-base-100 transition duration-150 ease-in-out md:mx-[30px]"
              >
                Crear cuenta
              </button>
            </div>
            {/* End Buttons */}
          </form>
        </div>
        {/* <form
          className="flex h-screen w-full max-w-md items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="m-64">
            <div className="p-12 shadow-lg shadow-kym4">
              <h2 className="mb-6 ml-6 cursor-default text-center text-xl font-bold text-kym3">
                Crear nueva cuenta
              </h2>
              <div className="m-6">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="mb-4 border-l-4 border-l-button bg-gray-100 py-1 px-8 invalid:border-2 invalid:border-red-500"
                  title=""
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
                <input
                  type="email"
                  placeholder="Correo"
                  className="mb-4 border-l-4 border-l-button bg-gray-100 py-1 px-8 invalid:border-2 invalid:border-red-500"
                  title=""
                  {...register("email", {
                    onChange: () => setEmailAlreadyExists(false),
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                {emailAlreadyExists && (
                  <p className="font-semibold text-red-500">
                    El email ya está siendo usado
                  </p>
                )}
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="mb-2 border-l-4 border-l-button bg-gray-100 py-1 px-8"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <label>
                  <input
                    type="checkbox"
                    className="mt-2 mb-2 border-l-4 border-l-button bg-gray-100 py-1 px-8"
                    required
                  />
                  {" Acepto la política de privacidad"}
                </label>
              </div>
              <div className="flex items-center justify-center">
                <div className="m-auto text-center">
                  <Link href="/login">
                    <u className="cursor-pointer text-kym2 hover:text-kym4">
                      Ir a Iniciar sesión
                    </u>
                  </Link>
                  <button
                    className="btn btn-sm m-2 mt-3 block rounded-md px-20 py-1 font-semibold uppercase text-white hover:bg-button_hover"
                    type="submit"
                  >
                    Crear cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form> */}
      </main>
    </div>
  );
};

export default SignUp;
