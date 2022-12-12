import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { ILogin, loginSchema } from "../utils/validations/auth";
import { IoEyeOffSharp, IoEyeSharp, IoLogoGoogle } from "react-icons/io5";
import Link from "next/link";

const SignIn: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    shouldUseNativeValidation: true,
  });

  const [emailNotExists, setEmailNotExists] = useState("");

  const { status } = useSession();
  if (status == "authenticated") {
    router.push(router.query.prev?.toString() ?? "/");
  }

  if (
    router.query.error &&
    router.query.error == "CredentialsSignin" &&
    emailNotExists == ""
  ) {
    setEmailNotExists("Email y/o contraseña inválido");
  }
  console.log(router.basePath);
  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: router.query.prev?.toString(),
    });
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  function showHidePassword() {
    setShowPassword((showPassword) => !showPassword);
  }

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="mt-2 ml-2 text-lg">Haber estudiado</h3>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-lg w-24 text-base-100">
              F
            </label>
          </div>
        </div>
      </div>

      <main className="bg-accent bg-contain bg-no-repeat md:bg-[url('/img/fondoLogin.png')]">
        <div className="flex flex-col pt-4">
          <Link href="/">
            <Image
              src="/logo sin subtitulo-blanco.svg"
              alt="not found"
              width={214.5}
              height={45}
              className="cursor-pointer"
            ></Image>
          </Link>
        </div>
        <div className="flex flex-col md:items-end">
          <div className="rounded-box mx-2 mb-10 mt-5 h-full border-[1px] bg-base-100 sm:mx-6 md:mr-16 md:h-[760px] md:w-[540px]">
            {/* Text */}
            <div className="text-center">
              <p className="ml-4 mr-44 mt-8 w-[335px] font-raleway text-[43px] md:mt-20 md:ml-8">
                ¡Hola de nuevo!
              </p>
              <p className="mx-4 mt-8 text-left text-sm md:ml-8">
                ¿Aún no tienes una cuenta? Únete a kilo y medio {""}
                <Link href={`/register?prev=${router.query.prev?.toString()}`}>
                  <b className="cursor-pointer font-satoshiBold">
                    registrándote
                  </b>
                </Link>
                .
              </p>
            </div>
            {/* End Text */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email + password */}
              <div className="responsive mt-8 flex flex-col items-center gap-5 md:mt-16">
                <div className="mx-8">
                  <div className="flex max-w-[480px]">
                    <input
                      className="input input-bordered h-16 w-[350px] rounded-full border-base-300 text-sm text-base-300 md:w-[480px]"
                      type="email"
                      id="emailInput"
                      placeholder="E-mail"
                      {...register("email", {
                        onChange: () => setEmailNotExists(""),
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-4 ml-7 -mb-4 text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mx-8 md:w-[480px]">
                  <div className="flex items-center justify-end">
                    <label className="swap absolute mr-8 md:ml-[430px]">
                      <input
                        type="checkbox"
                        onClick={() => showHidePassword()}
                      ></input>
                      <IoEyeSharp className="swap-on h-6 w-6"></IoEyeSharp>
                      <IoEyeOffSharp className="swap-off h-6 w-6"></IoEyeOffSharp>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered h-16 w-[350px] rounded-[30px] border-base-300 text-sm text-base-300 md:w-[480px]"
                      id="passwordInput"
                      placeholder="Contraseña"
                      {...register("password", {
                        onChange: () => setEmailNotExists(""),
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-4 ml-7 -mb-4 text-red-500">
                      Contraseña inválida
                    </p>
                  )}
                  <div className="mt-[1px] w-full text-end">
                    <label
                      htmlFor="my-modal"
                      className="cursor-pointer text-xs md:mr-[31px]"
                    >
                      ¿Olvidaste tu contraseña?
                    </label>
                  </div>
                  <p className="text-red-500">{emailNotExists}</p>
                </div>
              </div>
              {/* End Email + password */}
              {/* Buttons */}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="responsive btn btn-lg mx-4 mt-16 h-14 w-[350px] cursor-pointer text-sm text-base-100 transition duration-150 ease-in-out md:mx-8 md:w-[480px]"
                >
                  Iniciar sesión
                </button>
                <hr className="mx-4 mt-7 flex h-0 w-[346px] border-spacing-0 border-base-300 border-opacity-30 md:mx-8 md:w-[476px]"></hr>
                <div className="mx-8 mt-7 mb-4 flex items-center align-middle md:mb-0">
                  <button
                    className="btn h-14 w-[350px] rounded-full border-[1px] border-base-content bg-base-100 font-raleway text-sm hover:bg-base-100 md:w-[480px]"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: router.query.prev?.toString(),
                      })
                    }
                  >
                    Iniciar sesión con Google
                  </button>
                  <IoLogoGoogle
                    className="absolute ml-6"
                    size="25"
                  ></IoLogoGoogle>
                </div>
              </div>
              {/* End Buttons */}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
