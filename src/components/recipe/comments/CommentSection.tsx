import { trpc } from "@utils/trpc";
import { useState } from "react";

import { TiStarFullOutline } from "react-icons/ti";

import Stars from "../../Stars";
import Comment from "./Comment";

function CommentSection({ recipeId }: { recipeId: string }) {
  const utils = trpc.useContext();

  const { data } = trpc.user.client.getRecipeComments.useQuery({
    recipeId: recipeId,
  });

  const mutation = trpc.user.client.newRecipeComment.useMutation({
    onSuccess() {
      utils.user.client.getRecipeComments.invalidate();
    },
  });

  const [comment, setComment] = useState("");

  function sendComment() {
    mutation.mutateAsync({
      recipeId: recipeId,
      description: comment,
      rating: 5,
    });
  }

  return (
    <div className="my-16">
      <a className="tab tab-active tab-lifted h-24 rounded-tr-[50px] font-raleway text-xl">
        <p className="mr-8">COMENTARIOS</p>
      </a>
      <div className="grid grid-cols-2 bg-base-100 px-8 py-16">
        <div className="flex flex-col gap-6">
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
              <p className="font-satoshiBold text-lg">4,8</p>25 comentarios
            </div>
            {/* Percentages */}
            <div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 5
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                75%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 4
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                14%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 3
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                6%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="fill-accent" /> 2
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                4%
              </div>
              <div className="mb-2 flex items-center gap-4">
                <TiStarFullOutline size={20} className="mr-0.5 fill-accent" /> 1
                <hr className="h-1 w-80 border-0 bg-base-content"></hr>
                1%
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
            <Stars average={5} />

            <textarea
              id="comment"
              className="mt-6 mr-2 block rounded-lg border p-3"
              placeholder="tu opinión"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                console.log(comment);
              }}
            ></textarea>
            <button
              onClick={sendComment}
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
