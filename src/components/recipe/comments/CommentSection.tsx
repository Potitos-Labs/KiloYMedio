import { trpc } from "@utils/trpc";
import { useState } from "react";
import Image from "next/image";

import { TiStarFullOutline } from "react-icons/ti";

import Comment from "./CommentCard";
import HalfRating from "../RateHalfStars";

function CommentSection({ recipeId }: { recipeId: string }) {
  const utils = trpc.useContext();

  const { data } = trpc.user.client.getRecipeComments.useQuery({
    recipeId: recipeId,
  });

  const mutation = trpc.user.client.newRecipeComment.useMutation({
    onSuccess() {
      utils.user.client.getRecipeComments.invalidate();
      utils.user.client.getRecipeStatistics.invalidate();
    },
  });

  const { data: stats } = trpc.user.client.getRecipeStatistics.useQuery({
    recipeId: recipeId,
  });

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  function sendComment() {
    mutation.mutateAsync({
      recipeId: recipeId,
      description: comment,
      rating: rating,
    });
  }

  return (
    <div className="relative z-0 my-16 mx-4">
      {/* Elipse */}
      <div className="absolute -top-[52px] -left-6 flex w-full px-[24px]">
        <p className="rounded-tl-lg bg-base-100 px-8 pt-2 font-raleway text-xl">
          COMENTARIOS
        </p>
        <div className="absolute -top-[127.9px] left-[342px] -z-10 ">
          <Image
            src="/img/ellipse.svg"
            alt=""
            className="select-none"
            width={"300%"}
            height={"405%"}
            layout="fixed"
            objectFit="contain"
          />
        </div>
      </div>
      {/* End Elipse */}
      <div className="grid grid-cols-2 rounded-b-lg rounded-tr-lg bg-base-100 px-8 pt-32 pb-16">
        <div className="grid content-between gap-6">
          {data?.map((c) => {
            return (
              <Comment
                key=""
                user={c.User?.name ?? ""}
                description={c.description ?? ""}
                rating={c.rating}
                date={c.createdAt}
              />
            );
          })}
          <div className="text-center">
            <button className="w-32 rounded-full bg-base-content py-1 text-base-100">
              cargar más
            </button>
          </div>
        </div>
        <div>
          {/* Comments stats */}
          <div className="mb-14 flex gap-6">
            <div>
              <p className="font-satoshiBold text-lg">{stats?.average ?? 0}</p>
              {stats?.count ?? 0} comentarios
            </div>
            {/* Percentages */}
            <div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 5
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                {stats?.ranges[5] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 4
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                {stats?.ranges[4] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 3
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                {stats?.ranges[3] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 2
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                {stats?.ranges[2] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="mr-0.5 fill-accent" /> 1
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                {stats?.ranges[1] ?? 0}%
              </div>
            </div>
            {/* End Percentages */}
          </div>
          {/* End Comments stats */}
          {/* 'Leave your opinion' section */}
          <div className="flex flex-col">
            <p className="mb-2 font-satoshiBold text-sm">
              DÉJANOS AQUÍ TU OPINIÓN
            </p>
            <HalfRating setRating={setRating} />
            <textarea
              id="comment"
              className="rounded-box mt-6 mr-2 block h-40 border border-none p-3"
              placeholder="tu opinión"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
            <button
              onClick={sendComment}
              disabled={comment == ""}
              className="my-4 w-28 rounded-full bg-base-content py-1 text-base-100"
            >
              enviar
            </button>
          </div>
          {/* End 'Leave your opinion' section */}
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
