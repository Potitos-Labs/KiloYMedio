import { TiStarFullOutline } from "react-icons/ti";
// import Stars from "../../Stars";
import Comment from "./Comment";

function CommentSection() {
  return (
    <div className="my-16">
      <a className="tab tab-active tab-lifted h-24 rounded-tr-[50px] font-raleway text-xl">
        <p className="mr-8">COMENTARIOS</p>
      </a>
      <div className="grid grid-cols-2 bg-base-100 px-8 py-16">
        <Comment />
        <div className="flex justify-center gap-6">
          <div>
            <p className="text-lg">4,8</p>25 comentarios
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
