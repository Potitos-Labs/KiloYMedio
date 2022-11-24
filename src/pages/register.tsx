import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

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

  console.log({ errors });
  return (
    <div>
      <main className="flex flex-col items-center justify-center">
        <form
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
        </form>
      </main>
    </div>
  );
};

export default SignUp;
