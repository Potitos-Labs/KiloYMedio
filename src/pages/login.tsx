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
    //router.replace("/login", undefined, { shallow: true });
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
          <h3 className="mt-[10px] ml-[10px] text-lg font-bold">
            Haber estudiado
          </h3>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn btn-lg w-[100px] text-base-100"
            >
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
          <div className="rounded-box mx-2 mb-10 mt-[20px] h-full border-[1px] bg-base-100 md:mr-[70px] md:h-[760px] md:w-[540px]">
            {/* Text */}
            <div className="text-center">
              <p className="ml-[15px] mr-[175px] mt-[30px] w-[335px] font-raleway text-[43px] md:mt-[80px] md:ml-[30px]">
                ¡Hola de nuevo!
              </p>
              <p className="ml-[16px] mr-[17px] mt-[30px] text-left text-sm md:ml-[33px]">
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
              <div className="responsive mt-[30px] flex flex-col items-center gap-[19px] md:mt-[67px]">
                <div className="mx-[30px]">
                  <div className="flex max-w-[480px]">
                    <input
                      className="input input-bordered h-[60px] w-[350px] rounded-[30px] border-base-300 text-sm text-base-300 md:w-[480px]"
                      type="email"
                      id="emailInput"
                      placeholder="E-mail"
                      {...register("email", {
                        onChange: () => setEmailNotExists(""),
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="ml-7 -mb-[16px] text-[14px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mx-[30px] md:w-[480px]">
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
                      className="input input-bordered h-[60px] w-[350px] rounded-[30px] border-base-300 text-sm text-base-300 md:w-[480px]"
                      id="passwordInput"
                      placeholder="Contraseña"
                      {...register("password", {
                        onChange: () => setEmailNotExists(""),
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="ml-7 -mb-[16px] text-[14px] text-red-500">
                      Contraseña inválida
                    </p>
                  )}
                  <div className="mt-[1px] w-full text-end">
                    <label
                      htmlFor="my-modal"
                      className="ml-[327] cursor-pointer text-xs md:mr-[31px]"
                    >
                      ¿Olvidaste tu contraseña?
                    </label>
                  </div>
                  <p className="font-semibold text-red-500">{emailNotExists}</p>
                </div>
              </div>
              {/* End Email + password */}
              {/* Buttons */}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="responsive btn btn-lg mx-[15px] mt-[69px] h-[60px] w-[350px] cursor-pointer text-sm text-base-100 transition duration-150 ease-in-out md:mx-[30px] md:w-[480px]"
                >
                  Iniciar sesión
                </button>
                <hr className="mx-[16px] mt-[30px] flex h-0 w-[346px] border-spacing-0 border-base-content border-opacity-30 md:mx-[32px] md:w-[476px]"></hr>
                <div className="mx-[15px] mt-[30px] mb-[15px] flex items-center align-middle md:mx-[30px] md:mb-0">
                  <button
                    className="btn h-[60px] w-[350px] rounded-[30px] border-[1px] border-base-content bg-base-100 font-raleway text-sm hover:bg-base-100 md:w-[480px]"
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
                  <IoLogoGoogle className="absolute ml-[25px] h-[25px] w-[25px]"></IoLogoGoogle>
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
