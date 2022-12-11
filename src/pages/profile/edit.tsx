import Layout from "../../components/Layout";
import { PopUpAllergen } from "../../components/profile/PopUpAllergen";
import { FormWrapper } from "../../components/payment/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { IClient, clientSchema } from "../../utils/validations/client";
import { useSession } from "next-auth/react";

const EditProfile = () => {
  const sesion = useSession();
  const client = trpc.user.client.getById.useQuery().data;
  const utils = trpc.useContext();
  const router = useRouter();
  const { mutateAsync } = trpc.user.client.update.useMutation({
    onSuccess: () => {
      utils.user.client.getById.invalidate();
    },
  });

  const [edit, setEdit] = useState(true);
  const [open, setOpen] = useState(false);

  if (sesion.status === "unauthenticated") {
    router.push("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClient>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name,
      email: client?.email,
      address: client?.address,
      image: client?.image,
      location: client?.location,
      CP: client?.CP,
      phoneNumber: client?.phoneNumber,
      nif: client?.nif,
    },
  });

  const onSubmit = useCallback(
    async (data: IClient) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        setEdit(!edit);
      }
    },
    [mutateAsync, setEdit, edit],
  );

  function openPopup() {
    setOpen(true);
  }
  console.log({ errors });
  return (
    <Layout
      bgColor={"bg-base-content"}
      headerBgLight={true}
      headerTextDark={true}
    >
      <div
        className={`${open ? "blur-sm" : ""} m-20 rounded-lg bg-base-100 py-6`}
      >
        <div className="px-14 md:px-32 lg:px-40">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10  w-full">
              <div className="mr-8 flex flex-col items-center pt-20">
                <Image
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"
                  alt="notfound"
                  width="100"
                  height="100"
                  layout="fixed"
                  objectFit="cover"
                  className="rounded-full"
                ></Image>
              </div>
              <div className="rounded-box my-10 w-full border-[1px] border-base-300 px-4">
                <FormWrapper title="Datos personales">
                  {/*Nombre y apellidos*/}
                  <div className=" gird-cols-1 grid items-center lg:grid-cols-[17%_83%]">
                    <p className="py-2 text-sm">Nombre completo</p>
                    <input
                      type="text"
                      {...register("name")}
                      className="peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    />
                  </div>
                  {errors.name && (
                    <p className="w-full text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                  {/*Correo y Nombre*/}
                  <div className="my-5 grid grid-cols-1 sm:grid-cols-[20%_80%]  md:grid-cols-[15%_75%] lg:grid-cols-[17%_43%_12%_28%]">
                    <p className="py-2 text-sm">Correo</p>
                    <input
                      type="text"
                      {...register("email")}
                      className="peer mb-2 w-full rounded-full border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    />

                    <p className="py-2 text-sm lg:text-center">Teléfono</p>
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      className="peer mb-2 w-full rounded-full border-2 border-gray-300 py-2 pl-5 placeholder-gray-300"
                    />
                    <p className="text-sm">DNI</p>
                    <input
                      type="text"
                      {...register("nif")}
                      className="peer w-[200px] rounded-full border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500">{errors.email?.message}</p>
                  )}
                  {errors.phoneNumber && (
                    <p className="text-red-500">
                      {errors.phoneNumber?.message}
                    </p>
                  )}
                </FormWrapper>
              </div>
            </div>

            <div className="rounded-box my-10 w-full border-[1px] border-base-300 px-4">
              <FormWrapper title="Dirección de envío">
                <div className=" relative grid w-full grid-cols-1 py-8 md:grid-cols-[15%_85%] lg:grid-cols-[10%_90%]">
                  <p className="py-2 text-sm">Dirección</p>
                  <input
                    type="text"
                    {...register("address")}
                    className="peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500">{errors.address?.message}</p>
                )}
                {/*Correo y Nombre*/}
                <div className=":grid-cols-1 grid w-full sm:grid-cols-[20%_80%] md:grid-cols-[15%_35%_15%_35%] lg:grid-cols-[10%_40%_10%_40%]">
                  <p className="py-2 text-sm">Localidad</p>
                  <input
                    type="text"
                    {...register("location")}
                    className="peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 pr-2 placeholder-gray-300"
                  />

                  <p className="py-2 text-sm md:text-center">CP</p>
                  <input
                    type="text"
                    {...register("CP", { valueAsNumber: true })}
                    className="placeholder-gray-300r peer w-full rounded-full border-2 border-gray-300 py-2 pl-5 pr-2"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500">{errors.location?.message}</p>
                )}
                {errors.CP && (
                  <p className="text-red-500">{errors.CP?.message}</p>
                )}
              </FormWrapper>
            </div>
            <div className="rounded-box my-10 w-full border-[1px] border-base-300 px-4">
              <FormWrapper title="Alérgenos">
                <p
                  className="mt-8 mr-3 cursor-pointer text-right text-kym2 hover:text-kym4"
                  onClick={openPopup}
                >
                  <u>Modificar alérgenos</u>
                </p>
              </FormWrapper>
            </div>
            <div className="mb-10 text-right">
              <button
                type="submit"
                onClick={() => router.push("/profile")}
                className="btn rounded-full border-primary bg-primary px-4 py-2 text-base-100"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
        <PopUpAllergen open={open} setOpen={setOpen} />
      </div>
    </Layout>
  );
};

export default EditProfile;
