import React from "react";
const ProductDetail = ({
  name,
  img,
  description,
}: {
  name: string;
  img: string;
  description: string;
}) => {
  const [weight, setWeight] = React.useState(100);
  const IncrementWeight = () => {
    setWeight(weight + 100);
  };
  const DecrementWeight = () => {
    if (weight > 0) setWeight(weight - 100);
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-center text-xl font-bold capitalize">{name}</h1>
      <img
        className="my-2 inline-flex w-1/5 justify-start self-center"
        src={img}
        alt={name}
      />

      <div className="inline-flex">
        <div className="container my-4 items-center">
          <button
            className="ml-2 h-7 w-7 bg-orange-500  font-bold text-white hover:bg-orange-400"
            onClick={DecrementWeight}
          >
            -
          </button>

          <input
            className="mx-2 border-2  text-center "
            type="number"
            value={weight}
          />

          <button
            className="mr-2  h-7 w-7 bg-orange-500 font-bold   text-white hover:bg-orange-400"
            onClick={IncrementWeight}
          >
            +
          </button>

          <button className="my-4 block h-7 w-full bg-orange-500 px-4  text-center font-bold text-white  hover:bg-orange-400 ">
            Añadir al Carro
          </button>
        </div>
      </div>

      <DescriptionComponent description={description} />
    </main>
  );
};

const DescriptionComponent = ({ description }: { description: string }) => {
  return (
    <div>
      <hr></hr>
      <h2 className="text-lg ">Descripción del Producto</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProductDetail;
