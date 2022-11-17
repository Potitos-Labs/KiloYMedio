const RecipeDisplayer = ({
  recipes,
}: {
  recipes?: { id: string; name: string; imageURL: string; userId: string }[];
}) => {
  return (
    <div className="mx-5 mt-8 mb-6">
      <div className="carousel w-full">
        {recipes &&
          recipes.map((recipe, index) => (
            <div
              key={index}
              id={`index${index}`}
              className="carousel-item relative h-36 w-full"
            >
              <img src={recipe.imageURL} className="w-full" />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                {index > 0 ? (
                  <a href={`#index${index - 1}`} className="btn btn-circle">
                    ❮
                  </a>
                ) : (
                  <a
                    href={`#index${recipes.length - 1}`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                )}
                {index < recipes.length ? (
                  <a href={`#index${index + 1}`} className="btn btn-circle">
                    ❯
                  </a>
                ) : (
                  <a href={`#index${0}`} className="btn btn-circle">
                    ❯
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecipeDisplayer;
