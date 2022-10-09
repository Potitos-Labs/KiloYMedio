import React from "react";
import Stars from "../Stars";
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

      <Stars average={3.5}></Stars>

      <div className="inline-flex">
        <div className="container my-4 items-center">
          <button
            className="ml-2 h-7 w-7 bg-kym3  font-bold text-white hover:bg-kym2"
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
            className="mr-2  h-7 w-7 bg-kym3 font-bold   text-white hover:bg-kym2"
            onClick={IncrementWeight}
          >
            +
          </button>

          <button className="my-4 block h-7 w-full bg-kym3 px-4  text-center font-bold text-white  hover:bg-kym2 ">
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
      <h2 className="text-lg ">Descripción de los alergenos</h2>
      <p>{allergent}</p>
    </div>
  );
};

export default ProductDetail;
