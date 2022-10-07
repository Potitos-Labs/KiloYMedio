import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { ILogin, loginSchema } from "../utils/validations/auth";

const SignIn: NextPage = () => {
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  }, []);

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="rounded-lg shadow-lg bg-white max-w-sm p-8">
          <div className="text-center mb-3">
            <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6>
          </div>
          <div className="btn-wrapper text-center">
            <button
              className="bg-red-500 active:bg-gray-100 text-white font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center hover:font-bold text-xs"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => signIn("google")}
            >
              Google
            </button>
          </div>
          <hr className="mt-6 border-b-1 border-gray-400" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-6">
              <label
                form="emailInput"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="emailInput"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>
            <div className="form-group mb-6">
              <label
                form="passwordInput"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="passwordInput"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <button
              type="submit"
              className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
