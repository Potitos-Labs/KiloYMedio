import Layout from "@components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCError } from "@trpc/server";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Error from "next/error";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi";

import { trpc } from "../../utils/trpc";
import {
  ISignUpByAdminSchema,
  signUpByAdminSchema,
} from "../../utils/validations/auth";

const SignUpByAdmin: NextPage = () => {
  const [nifAlreadyExists, setNifAlreadyExists] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISignUpByAdminSchema>({
    resolver: zodResolver(signUpByAdminSchema),
    criteriaMode: "all",
    shouldUseNativeValidation: true,
  });

  console.log(errors);

  const { mutateAsync } = trpc.user.client.createNewByAdmin.useMutation();
  const onSubmit = useCallback(
    async (data: ISignUpByAdminSchema) => {
      try {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          router.push("/");
        }
      } catch (e) {
        const error = e as TRPCError;
        if (error.message.includes("email")) setEmailAlreadyExists(true);
        if (error.message.includes("nif")) setNifAlreadyExists(true);
      }
    },
    [mutateAsync, router],
  );

  const { data: session, status } = useSession();
  if (status == "loading") {
    return <div>Cargando...</div>;
  }

  if (status == "unauthenticated" || session?.user?.role != "admin") {
    return <Error statusCode={404}></Error>;
  }

  return (
    <main>
      <Layout
        bgColor={"bg-base-100"}
        headerBgLight={true}
        headerTextDark={true}
      >
        <form
          className="my-10 flex h-full flex-col place-content-center items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mx-5 grid gap-6 sm:mx-10 sm:grid-cols-1 md:grid-cols-2">
            <h1 className="mb-6 cursor-default text-center font-raleway text-[30px] uppercase sm:text-[45px] md:col-span-2">
              Registrar nuevo cliente
            </h1>
            <label className="relative flex w-full flex-col md:col-span-2">
              <span className="mb-2">Nombre completo *</span>
              <input
                autoFocus
                className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300 invalid:border-pink-600"
                type="text"
                placeholder="Nombre y apellidos"
                {...register("username")}
              />
              <HiOutlineUser className="relative bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-9 transform text-black peer-placeholder-shown:text-gray-300" />
              <p className="invisible -mt-3 text-sm text-pink-600 peer-invalid:visible">
                {errors.username?.message}
              </p>
            </label>
            <label className="relative flex w-full flex-col">
              <span className="mb-2">NIF *</span>
              <input
                autoFocus
                className={`peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300 invalid:border-pink-600 ${
                  nifAlreadyExists && "border-pink-600"
                }`}
                type="text"
                placeholder="NIF o NIE"
                {...register("nif", {
                  onChange: () => setNifAlreadyExists(false),
                })}
              />
              <HiOutlineIdentification className="relative bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-9 transform text-black peer-placeholder-shown:text-gray-300" />
              <p
                className={`-mt-3 text-sm text-pink-600 peer-invalid:visible ${
                  nifAlreadyExists ? "visible" : "invisible"
                }`}
              >
                {errors.nif?.message}
                {nifAlreadyExists && "El NIF ya est?? registrado"}
              </p>
            </label>
            <label className="relative flex w-full flex-col">
              <span className="mb-2">Tel??fono *</span>
              <input
                autoFocus
                className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300 invalid:border-pink-600"
                type="text"
                placeholder="N??mero de tel??fono"
                {...register("phoneNumber")}
              />
              <HiOutlinePhone className="relative bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-9 transform text-black peer-placeholder-shown:text-gray-300" />
              <p className="invisible -mt-3 text-sm text-pink-600 peer-invalid:visible">
                {errors.phoneNumber?.message}
              </p>
            </label>
            <label className="relative flex w-full flex-col md:col-span-2">
              <span className="mb-2">Correo *</span>
              <input
                autoFocus
                className={`peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300 invalid:border-pink-600 ${
                  emailAlreadyExists && "border-pink-600"
                }`}
                type="text"
                placeholder="Correo"
                {...register("email", {
                  onChange: () => setEmailAlreadyExists(false),
                })}
              />
              <HiOutlineMail className="relative bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-9 transform text-black peer-placeholder-shown:text-gray-300" />
              <p
                className={`-mt-3 text-sm text-pink-600 peer-invalid:visible ${
                  emailAlreadyExists ? "visible" : "invisible"
                }`}
              >
                {errors.email?.message}
                {emailAlreadyExists && "El correo ya est?? registrado"}
              </p>
            </label>
            <label className="relative flex w-full flex-col">
              <span className="mb-2">Localidad *</span>
              <input
                autoFocus
                className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300 invalid:border-pink-600"
                type="text"
                placeholder="Localidad"
                {...register("location")}
              />
              <HiOutlineLocationMarker className="relative bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-9 transform text-black peer-placeholder-shown:text-gray-300" />
              <p className="invisible -mt-3 text-sm text-pink-600 peer-invalid:visible">
                {errors.location?.message}
              </p>
            </label>
            <label className="relative flex w-full flex-col">
              <span className="mb-2">CP *</span>
              <input
                autoFocus
                className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300 invalid:border-pink-600"
                type="text"
                placeholder="C??digo postal"
                {...register("code_postal", { valueAsNumber: true })}
              />
              <HiOutlineLocationMarker className="relative bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-9 transform text-black peer-placeholder-shown:text-gray-300" />
              <p className="invisible -mt-3 text-sm text-pink-600 peer-invalid:visible">
                {errors.code_postal?.message}
              </p>
            </label>
            <label className="relative flex w-full flex-col md:col-span-2">
              <span className="mb-2">Direcci??n *</span>
              <input
                autoFocus
                className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300 invalid:border-pink-600"
                type="text"
                placeholder="Direcci??n"
                {...register("address")}
              />
              <HiOutlineLocationMarker className="relative bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-9 transform text-black peer-placeholder-shown:text-gray-300" />
              <p className="invisible -mt-3 text-sm text-pink-600 peer-invalid:visible">
                {errors.address?.message}
              </p>
            </label>
            <button
              type="submit"
              className="btn whitespace-nowrap rounded-full px-4 py-2 text-white  md:col-span-2"
              onClick={() => setValue("password", "Potitos22")}
            >
              Registar cliente
            </button>
          </div>
        </form>
      </Layout>
    </main>
  );
};

export default SignUpByAdmin;
