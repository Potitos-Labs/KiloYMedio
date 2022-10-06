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
    <main className="flex flex-col justify-center h-screen items-center">
      <h1 className="text-xl font-bold text-center capitalize">{name}</h1>
      <img
        className="w-1/5 self-center inline-flex justify-start my-2"
        src={img}
        alt={name}
      />

      <div className="inline-flex">
        <div className="my-4 container items-center">
          <button
            className="bg-orange-500 ml-2 w-7 h-7  font-bold text-white hover:bg-orange-400"
            onClick={DecrementWeight}
          >
            -
          </button>

          <input
            className="mx-2 text-center  border-2 "
            type="number"
            value={weight}
          />

          <button
            className="bg-orange-500  hover:bg-orange-400 mr-2 w-7 h-7   font-bold text-white"
            onClick={IncrementWeight}
          >
            +
          </button>

          <button className="block w-full hover:bg-orange-400 my-4 px-4 bg-orange-500  h-7 font-bold text-white  text-center ">
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

const AllergentComponent = ({ allergent }: { allergent: string }) => {
  return (
    <div>
      <hr></hr>
      <h2 className="text-lg ">Alérgenos</h2>
      <p>{allergent}</p>
    </div>
  );
};

export default ProductDetail;
