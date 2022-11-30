import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Image from "next/image";

import { trpc } from "../utils/trpc";
import { ISignUp, signUpSchema } from "../utils/validations/auth";

const SignUp: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    shouldUseNativeValidation: true, // need for :invalid tag tailwind
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    criteriaMode: "all",
    reValidateMode: "onChange",
  });

  const { status } = useSession();
  if (status == "authenticated") {
    router.push("/");
  }

  const { mutateAsync } = trpc.user.client.createNew.useMutation();

  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [confirmPassword, setConfirmValue] = useState("");

  console.log({ matchPassword });
  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        if (!matchPassword) return;
        const result = await mutateAsync(data);
        if (result.status === 201) {
          router.push("/");
        }
      } catch (error) {
        setEmailAlreadyExists(true);
      }
    },
    [mutateAsync, router, matchPassword],
  );

  const [showPassword, setShowPassword] = useState(false);

  function showHidePassword() {
    setShowPassword((showPassword) => !showPassword);
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function showHideConfirmPassword() {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  }

  useEffect(() => {
    if (confirmPassword == "") {
      setMatchPassword(false);
      return;
    }
    if (getValues("password") != confirmPassword) {
      setMatchPassword(false);
    } else {
      setMatchPassword(true);
    }
  }, [confirmPassword, getValues]);

  console.log({ errors });
  return (
    <main className="h-screen bg-accent bg-cover bg-no-repeat md:items-end md:bg-[url('/img/fondoRegistrarse.png')]">
      {/* <div className="bg-[##FFA24B] flex w-screen flex-col items-center pt-[20px]"> */}
      <div className="flex w-full flex-col items-center py-[10px]">
        <Image
          src="/img/logoWhite.png"
          alt="not found"
          width={214.5}
          height={45}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        ></Image>
      </div>

      <div className=" flex h-full flex-col justify-center px-2 md:items-end">
        <div className="mt-[20px] mb-12 rounded-[20px] border-[1px] bg-base-100 md:mr-[70px]">
          {/* Text */}
          <div className="text-center">
            <p className="mt-[30px] mr-[51px] flex font-raleway text-[43px] leading-10 md:mt-[80px] md:ml-[30px] md:whitespace-nowrap">
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
            <div className="mt-[30px] flex w-full flex-col items-center gap-[19px] px-6 md:mt-[74px]">
              <div className="mx-[30px] flex w-full">
                <div className="flex w-full flex-row gap-[20px]">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="input input-bordered h-[60px] w-full rounded-[30px] border-base-300 text-sm text-base-300"
                    tabIndex={1}
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="ml-7 -mb-[18px] text-[14px] text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mx-[30px] w-full">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="input input-bordered h-[60px] w-full rounded-[30px] border-base-300 text-sm text-base-300"
                    tabIndex={2}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="ml-7 -mb-[18px] text-[14px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
                {emailAlreadyExists && (
                  <p className="ml-7 -mb-[18px] text-[14px] text-red-500">
                    El email ya está siendo usado
                  </p>
                )}
              </div>
              <div className="mx-[30px] w-full">
                <div className="flex w-full items-center justify-end">
                  <label className="swap absolute mr-[30px] md:ml-[430px]">
                    <input
                      type="checkbox"
                      onClick={() => showHidePassword()}
                      tabIndex={4}
                    ></input>
                    <IoEyeSharp className="swap-on h-[25px] w-[25px]"></IoEyeSharp>
                    <IoEyeOffSharp className="swap-off h-[25px] w-[25px]"></IoEyeOffSharp>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    id="password"
                    className="input input-bordered h-[60px] w-full rounded-[30px] border-base-300 text-sm text-base-300 "
                    tabIndex={3}
                    {...register("password")}
                  />
                </div>
              </div>
              <div className="mx-[30px] w-full">
                <div className="flex items-center justify-end">
                  <label className="swap absolute mr-[30px] md:ml-[430px]">
                    <input
                      type="checkbox"
                      onClick={() => showHideConfirmPassword()}
                      tabIndex={6}
                    ></input>
                    <IoEyeSharp className="swap-on h-[25px] w-[25px]"></IoEyeSharp>
                    <IoEyeOffSharp className="swap-off h-[25px] w-[25px]"></IoEyeOffSharp>
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repetir contraseña"
                    id="passwordConfirm"
                    className="input input-bordered h-[60px] w-full rounded-[30px] border-base-300 text-sm text-base-300"
                    tabIndex={5}
                    onChange={(e) => {
                      setConfirmValue(e.target.value ?? "");
                    }}
                  />
                </div>
                {errors.password && (
                  <p className="ml-7 -mb-[48px] text-[14px] text-red-500">
                    {errors.password.message}
                  </p>
                )}
                {!matchPassword &&
                  !errors.password &&
                  getValues("password") != "" && (
                    <p className="ml-7 -mb-[48px] text-[14px] text-red-500">
                      Las contraseñas no coinciden
                    </p>
                  )}
              </div>
            </div>
            {/* End Info */}
            {/* Button */}
            <div className="flex w-full flex-col items-center px-6 pb-[25px]">
              <button
                type="submit"
                className="responsive btn btn-lg mx-[15px] mb-[20px] mt-[60px] h-[60px] w-full cursor-pointer text-sm text-base-100 transition duration-150 ease-in-out md:mx-[30px] md:mb-0 md:mt-[69px]"
              >
                Crear cuenta
              </button>
            </div>

            {/* End Buttons */}
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
