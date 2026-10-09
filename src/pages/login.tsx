import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "@components/ui/Image";

import { ILogin, loginSchema } from "../utils/validations/auth";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Link from "next/link";

const SignIn: NextPage = () => {
  const router = useRouter();
  const returnTo =
    typeof router.query.prev === "string" &&
    router.query.prev.startsWith("/") &&
    !router.query.prev.startsWith("//") &&
    !router.query.prev.includes("\\")
      ? router.query.prev
      : "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    shouldUseNativeValidation: false,
  });

  const [emailNotExists, setEmailNotExists] = useState("");

  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") void router.replace(returnTo);
  }, [status, router, returnTo]);

  useEffect(() => {
    if (router.query.error === "CredentialsSignin")
      setEmailNotExists("Email y/o contraseña inválido");
  }, [router.query.error]);

  const onSubmit = useCallback(
    async (data: ILogin) => {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: returnTo,
      });
    },
    [returnTo],
  );

  const [showPassword, setShowPassword] = useState(false);

  function showHidePassword() {
    setShowPassword((showPassword) => !showPassword);
  }

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="ml-2 mt-2 text-lg">Haber estudiado</h3>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-lg w-24 text-base-100">
              F
            </label>
          </div>
        </div>
      </div>

      <div className="h-screen bg-gradient-to-b from-[#FFAA5A] to-[#FCA859]">
        <main className="h-full bg-contain bg-left-bottom bg-no-repeat md:bg-[url('/api/images/site/dee3b235-a2a1-80b9-6cab-5691ffd7e9c8.webp')]">
          <div className="flex flex-col pt-4">
            <Link href="/">
              <Image
                src="/api/images/site/0887ec3f-5dbf-0b89-9a4c-1beead0bf0d1.svg"
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
                <p className="mr-44 mt-8 w-[335px] font-raleway text-[40px] sm:ml-4 md:ml-8 md:mt-20">
                  ¡Hola de nuevo!
                </p>
                <p className="mx-4 mt-8 text-left text-sm md:ml-8">
                  ¿Aún no tienes una cuenta? Únete a kilo y medio {""}
                  <Link
                    href={{ pathname: "/register", query: { prev: returnTo } }}
                  >
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
                        className="input input-bordered h-16 w-[330px] rounded-full border-base-300 text-sm text-base-300 sm:w-[480px] md:w-[480px]"
                        type="email"
                        id="emailInput"
                        placeholder="E-mail"
                        {...register("email", {
                          onChange: () => setEmailNotExists(""),
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-4 -mb-4 ml-7 text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="mx-8 w-[330px] sm:w-[480px]">
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
                        className="input input-bordered h-16 w-[350px] rounded-full border-base-300 text-sm text-base-300 sm:w-[480px]"
                        id="passwordInput"
                        placeholder="Contraseña"
                        {...register("password", {
                          onChange: () => setEmailNotExists(""),
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-4 -mb-4 ml-7 text-red-500">
                        Contraseña inválida
                      </p>
                    )}
                    <div className="mt-[1px] w-full text-end">
                      <label
                        htmlFor="my-modal"
                        className="mr-2 cursor-pointer text-xs md:mr-5"
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
                    className="responsive btn btn-lg mx-4 mt-16 h-14 w-[330px] cursor-pointer text-sm text-base-100 transition duration-150 ease-in-out sm:w-[480px] md:mx-8"
                  >
                    Iniciar sesión
                  </button>
                </div>
                {/* End Buttons */}
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SignIn;
