import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { ILogin, loginSchema } from "../utils/validations/auth";

const SignIn: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const { status } = useSession();
  if (status == "authenticated") {
    router.push("/");
  }

  const [googleError, setGoogleError] = useState("");

  if (
    router.query.error &&
    router.query.error == "OAuthAccountNotLinked" &&
    googleError == ""
  ) {
    setGoogleError("Ya existe una cuenta con ese correo de Google");
    router.replace("/login", undefined, { shallow: true });
  }

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  }, []);

  return (
    <Layout>
      <main className="flex h-screen flex-col items-center justify-center">
        <div className="max-w-sm rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-3 text-center">
            <h6 className="text-sm font-bold text-gray-600">Sign in with</h6>
          </div>
          <div className="btn-wrapper text-center">
            <button
              className="mr-1 mb-1 inline-flex items-center rounded bg-red-500 px-4 py-2 text-xs font-normal uppercase text-white shadow outline-none hover:font-bold hover:shadow-md focus:outline-none active:bg-gray-100"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              Google
            </button>
            <p className="font-semibold text-red-600">{googleError}</p>
          </div>
          <hr className="border-b-1 mt-6 border-gray-400" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-6">
              <label
                form="emailInput"
                className="form-label mb-2 inline-block text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                id="emailInput"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>
            <div className="form-group mb-6">
              <label
                form="passwordInput"
                className="form-label mb-2 inline-block text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                id="passwordInput"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <button
              type="submit"
              className=" w-full rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default SignIn;
