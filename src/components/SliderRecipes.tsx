import SmallRecipeCard from "./recipe/Displayers/SmallRecipeCard";
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
import BigRecipeCard from "./recipe/Displayers/BigRecipeCard";

function SliderRecipes({
  isBig,
  recipes,
}: {
  isBig: boolean;
  recipes?: IRecipe[];
}) {
  return (
    <div className="container">
      <div className="flex h-auto w-full items-center justify-between py-24 px-4 sm:py-8">
        {/* Carousel for desktop and large size devices */}
        <CarouselProvider
          className="hidden h-full w-full md:flex md:flex-col"
          naturalSlideWidth={100}
          naturalSlideHeight={150}
          isIntrinsicHeight={true}
          totalSlides={recipes?.length ?? 0}
          visibleSlides={isBig ? 2 : 4}
          step={isBig ? 1 : 2}
          infinite={true}
        >
          <div className=" flex w-full flex-col items-center justify-between">
            <div className="mx-auto h-full w-full">
              <Slider>
                <div
                  id="slider"
                  className="flex h-full items-center justify-between gap-8 transition duration-700 ease-out"
                >
                  {recipes?.map((r, index) => {
                    if (!isBig) {
                      return (
                        <Slide index={index} key={""}>
                          <SmallRecipeCard
                            key={r.id}
                            id={r.id}
                            name={r.name}
                            imageURL={r.imageURL}
                            authorID={r.userId}
                          />
                        </Slide>
                      );
                    } else {
                      return (
                        <Slide index={index} key={""}>
                          <BigRecipeCard
                            key={r.id}
                            id={r.id}
                            name={r.name}
                            imageURL={r.imageURL}
                            authorID={r.userId}
                          />
                        </Slide>
                      );
                    }
                  })}
                </div>
              </Slider>
            </div>
            <div className="flex w-full justify-end py-10">
              <ButtonBack
                role="button"
                aria-label="slide backward"
                className="left-0 z-30 ml-8 cursor-pointer"
                id="prev"
              >
                <BsFillArrowLeftSquareFill className="h-[25px] w-[50px] rounded-sm" />
              </ButtonBack>
              <ButtonNext
                role="button"
                aria-label="slide forward"
                className="right-0 z-30 mr-8 "
                id="next"
              >
                <BsFillArrowRightSquareFill className="h-[25px] w-[50px] rounded-sm" />
              </ButtonNext>
            </div>
          </div>
        </CarouselProvider>

        {/* Carousel for tablet and medium size devices */}
        <CarouselProvider
          className=" flex h-full w-full flex-col sm:hidden"
          naturalSlideWidth={100}
          naturalSlideHeight={200}
          isIntrinsicHeight={true}
          totalSlides={recipes?.length ?? 0}
          visibleSlides={2}
          step={1}
          infinite={true}
        >
          <div className=" flex w-full flex-col items-center justify-between">
            <div className="mx-auto h-full w-full">
              <Slider>
                <div
                  id="slider"
                  className="flex h-full items-center  gap-6 transition duration-700 ease-out"
                >
                  {recipes?.map((r, index) => {
                    return (
                      <Slide index={index} key={""}>
                        <SmallRecipeCard
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
            <div className="flex w-full justify-end py-10">
              <ButtonBack
                role="button"
                aria-label="slide backward"
                className="left-0 z-30 ml-8 cursor-pointer"
                id="prev"
              >
                <BsFillArrowLeftSquareFill className="h-[25px] w-[50px] rounded-sm" />
              </ButtonBack>
              <ButtonNext
                role="button"
                aria-label="slide forward"
                className="right-0 z-30 mr-8"
                id="next"
              >
                <BsFillArrowRightSquareFill className="h-[25px] w-[50px] rounded-sm" />
              </ButtonNext>
            </div>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
}
export default SliderRecipes;
