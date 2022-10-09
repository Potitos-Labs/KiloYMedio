import { Allergen } from "@prisma/client";
import React from "react";
import Stars from "../Stars";
import AllergensComponent from "../Allergen";

const ProductDetail = ({
  name,
  img,
  description,
  allergensList,
}: {
  name: string;
  img: string;
  description: string;
  allergensList: Allergen[];
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

      <Stars average={2.5}></Stars>

      <AllergensComponent
        allergens={allergensList}
        size={30}
      ></AllergensComponent>

      <div className="inline-flex">
        <div className="container my-4 items-center">
          <button
            className="ml-2 h-7 w-7 bg-button  font-bold text-white hover:bg-button_hover"
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
            className="mr-2  h-7 w-7 bg-button font-bold   text-white hover:bg-button_hover"
            onClick={IncrementWeight}
          >
            +
          </button>

          <button className="my-4 block h-7 w-full bg-button px-4  text-center font-bold text-white  hover:bg-button_hover ">
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

const AllergentDescription = ({ allergen }: { allergen: string }) => {
  return (
    <div>
      <hr></hr>
      <h2 className="text-lg ">Descripción de los alergenos</h2>
      <p>{allergen}</p>
    </div>
  );
};

export default ProductDetail;
