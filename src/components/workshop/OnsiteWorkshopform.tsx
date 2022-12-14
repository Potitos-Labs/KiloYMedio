import { UploadImage } from "@components/ui/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IWorkshopCreate,
  workshopCreateSchema,
} from "@utils/validations/workshop";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { useCallback } from "react";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

function OnsiteWorkshopForm() {
  const { mutateAsync: createWorshop } =
    trpc.workshop.createNewWorkshop.useMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IWorkshopCreate>({
    resolver: zodResolver(workshopCreateSchema),
    criteriaMode: "all",
    shouldUseNativeValidation: false,
  });
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: IWorkshopCreate) => {
      await createWorshop(data);
      router.push(`/`);
    },
    [createWorshop, router],
  );
  return (
    <form
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mx-10 mt-3 flex w-full flex-col items-center rounded-lg border-2 border-primary p-5 shadow-xl">
        <h2 className="mb-6 cursor-default text-center text-2xl font-bold text-black md:text-3xl">
          Nuevo taller presencial
        </h2>
        <div className="xs:grid-cols-1 m-6 grid place-content-between gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Nombre *</span>
            <input
              type="text"
              placeholder="Nombre del producto"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("name")}
            />
            <p className="text-sm text-pink-600">{errors.name?.message}</p>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Plazas *</span>
            <input
              type="number"
              step="any"
              placeholder="Plazas"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              min={0}
              {...register("OnSiteWorkshop.places", {
                valueAsNumber: true,
              })}
            />
            <p className="text-sm text-pink-600">
              {errors.OnSiteWorkshop?.places?.message}
            </p>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Fecha *</span>
            <input
              type="date"
              step="any"
              placeholder="dia"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("OnSiteWorkshop.date", { valueAsDate: true })}
            />
            <p className="text-sm text-pink-600">
              {errors.OnSiteWorkshop?.date?.message == "Invalid date"
                ? "Fecha inv??lida"
                : errors.OnSiteWorkshop?.date?.message}
            </p>
          </label>
          <label className="relative col-span-2 flex w-full flex-col">
            <span className="mb-2">Descripci??n *</span>
            <input
              type="text"
              placeholder="Descripci??n"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("description")}
            />
            <p className="text-sm text-pink-600">
              {errors.description?.message}
            </p>
          </label>
          <label className="col-span-3 flex w-full flex-col">
            <span className="mb-2">Imagen *</span>
            <Controller
              control={control}
              name="imageURL"
              render={({ field: { onChange, value } }) => (
                <div className="m-2 flex flex-col gap-4 md:flex-row">
                  <UploadImage setImageURL={onChange}></UploadImage>
                  <Image
                    src={value ?? "/img/placeholder.jpg"}
                    width={100}
                    height={100}
                    layout="intrinsic"
                    objectFit="contain"
                    alt="Imagen del producto"
                  ></Image>
                </div>
              )}
            />
            <p className="text-sm text-pink-600">{errors.imageURL?.message}</p>
          </label>
        </div>
        <div className="flex flex-row">
          <button
            className="md:px-26 btn-sm m-2 mt-3 block rounded bg-base-content py-1 px-20 text-base-100"
            type="submit"
          >
            Crear taller
          </button>
        </div>
      </div>
    </form>
  );
}

export default OnsiteWorkshopForm;
