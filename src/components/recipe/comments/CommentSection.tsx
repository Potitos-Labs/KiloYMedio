import { trpc } from "@utils/trpc";
import { useState } from "react";
import Image from "next/image";

import { TiStarFullOutline } from "react-icons/ti";

import Comment from "./CommentCard";
import HalfRating from "../RateHalfStars";

function CommentSection({ recipeId }: { recipeId: string }) {
  const utils = trpc.useContext();

  const { data } = trpc.recipe.getComments.useQuery({
    recipeId: recipeId,
  });

  const mutation = trpc.recipe.newComment.useMutation({
    onSuccess() {
      utils.recipe.getComments.invalidate();
      utils.recipe.getCommentsStatistics.invalidate();
    },
  });

  const { data: stats } = trpc.recipe.getCommentsStatistics.useQuery({
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
      <div className="absolute top-0 right-6 flex w-full px-[24px] sm:-top-12 md:-top-[52px] md:-left-6">
        <p className="rounded-t-lg bg-base-100 px-8 pt-4 font-raleway text-lg sm:rounded-tl-lg md:text-xl">
          COMENTARIOS
        </p>
        <div className="absolute -top-[127.9px] left-28 -z-10 hidden sm:flex md:left-[342px] ">
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
      <div className="flex grid-cols-[52%_48%] flex-col rounded-b-lg rounded-tr-lg bg-base-100 px-8 pt-24 pb-16 lg:grid">
        <div className="order-2 grid content-between justify-center gap-6 lg:order-1 lg:justify-start">
          {data?.map((c) => {
            return (
              <Comment
                key=""
                imageURL={c.User?.image ?? ""}
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
        <div className="order-1 justify-center md:px-16 lg:order-2 lg:justify-start lg:px-0">
          {/* Comments stats */}
          <div className="mb-14 block justify-between sm:flex">
            <div className="w-[150px]">
              <p className="font-satoshiBold text-lg">{stats?.average ?? 0}</p>
              <p className="mb-6 flex sm:mb-0">
                {stats?.count ?? 0} comentarios
              </p>
            </div>
            {/* Percentages */}
            <div className="sm:w-[500px] md:mr-10 lg:w-96">
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 5
                <progress
                  className="progress"
                  value={stats?.rangesPercentage[5]}
                  max="100"
                ></progress>
                {stats?.rangesPercentage[5] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 4
                <progress
                  className="progress"
                  value={stats?.rangesPercentage[4]}
                  max="100"
                ></progress>
                {stats?.rangesPercentage[4] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 3
                <progress
                  className="progress"
                  value={stats?.rangesPercentage[3]}
                  max="100"
                ></progress>
                {stats?.rangesPercentage[3] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 2
                <progress
                  className="progress"
                  value={stats?.rangesPercentage[2]}
                  max="100"
                ></progress>
                {stats?.rangesPercentage[2] ?? 0}%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="mr-0.5 fill-accent" /> 1
                <progress
                  className="progress"
                  value={stats?.rangesPercentage[1]}
                  max="100"
                ></progress>
                {stats?.rangesPercentage[1] ?? 0}%
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
              className="my-4 mb-10 w-28 rounded-full bg-base-content py-1 text-base-100 lg:mb-0"
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
