import LittleRecipeCard from "./recipe/Displayers/LittleRecipeCard";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IRecipe } from "@utils/validations/recipe";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

function SliderRecipes({
  isBig,
  recipes,
}: {
  isBig: boolean;
  recipes?: IRecipe[];
}) {
  return (
    <div className="w-ull h-ful container">
      <div className="m-10 flex h-auto w-full items-center justify-between py-24 px-4 sm:py-8">
        {/* Carousel for desktop and large size devices */}
        <CarouselProvider
          className="hidden h-full w-full lg:flex lg:flex-col"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          isIntrinsicHeight={false}
          totalSlides={recipes?.length ?? 0}
          visibleSlides={isBig ? 2 : 4}
          step={1}
          infinite={false}
        >
          <div className=" flex w-full flex-col items-center justify-between">
            <div className="mx-auto h-full w-full">
              <Slider>
                <div
                  id="slider"
                  className="flex h-full items-center justify-start gap-14 transition duration-700 ease-out md:gap-6 lg:gap-8"
                >
                  {recipes?.map((r, index) => {
                    if (!isBig) {
                      return (
                        <Slide index={index} key={""}>
                          <LittleRecipeCard
                            key={r.id}
                            id={r.id}
                            name={r.name}
                            imageURL={r.imageURL}
                            authorID={r.userId}
                          />
                        </Slide>
                      );
                    } else {
                      <Slide index={index} key={""}>
                        <LittleRecipeCard
                          key={r.id}
                          id={r.id}
                          name={r.name}
                          imageURL={r.imageURL}
                          authorID={r.userId}
                        />
                      </Slide>;
                    }
                  })}
                </div>
              </Slider>
            </div>
            <div className="flex w-full justify-end py-10">
              <ButtonBack
                role="button"
                aria-label="slide backward"
                className="left-0 z-30 ml-8 cursor-pointer focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                id="prev"
              >
                <BsFillArrowLeftSquareFill className="h-[25px] w-[50px] rounded-sm" />
              </ButtonBack>
              <ButtonNext
                role="button"
                aria-label="slide forward"
                className="right-0 z-30 mr-8 focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                id="next"
              >
                <BsFillArrowRightSquareFill className="h-[25px] w-[50px] rounded-sm" />
              </ButtonNext>
            </div>
          </div>
        </CarouselProvider>

        {/* Carousel for tablet and medium size devices */}
        <CarouselProvider
          className="hidden md:block lg:hidden"
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          isIntrinsicHeight={true}
          totalSlides={12}
          visibleSlides={2}
          step={1}
          infinite={true}
        >
          <div className="relative flex w-full items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute left-0 z-30 ml-8 cursor-pointer focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="mx-auto h-full w-full overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div
                  id="slider"
                  className="flex h-full items-center justify-start gap-14 transition duration-700 ease-out md:gap-6 lg:gap-8"
                >
                  {recipes?.map((r, index) => {
                    return (
                      <Slide index={index} key={""}>
                        <LittleRecipeCard
                          key={r.id}
                          id={r.id}
                          name={r.name}
                          imageURL={r.imageURL}
                          authorID={r.userId}
                        />
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute right-0 z-30 mr-8 focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for mobile and Small size Devices */}
        <CarouselProvider
          className="block md:hidden "
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          isIntrinsicHeight={true}
          totalSlides={12}
          visibleSlides={1}
          step={1}
          infinite={true}
        >
          <div className="relative flex w-full items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute left-0 z-30 ml-8 cursor-pointer focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="mx-auto h-full w-full overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div
                  id="slider"
                  className="flex h-full w-full items-center justify-start transition duration-700 ease-out md:gap-6 lg:gap-8"
                >
                  {recipes?.map((r, index) => {
                    return (
                      <Slide index={index} key={""}>
                        <LittleRecipeCard
                          key={r.id}
                          id={r.id}
                          name={r.name}
                          imageURL={r.imageURL}
                          authorID={r.userId}
                        />
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute right-0 z-30 mr-8 focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
}
export default SliderRecipes;
