import Stars from "../../Stars";

function Comment() {
  return (
    <div>
      <div className="w-[550px] rounded-lg bg-white p-8">
        <p className="mb-2 font-satoshiBold">ELENA MARTÍNEZ</p>
        <p className="mb-10 text-justify">
          Me ha gustado mucho, gracias por compartirla. Probé a hacerla ayer y
          estaba deliciosa. Con un toque de pimienta, está mejor aún.
        </p>
        <div className="flex justify-between">
          <Stars average={4}></Stars>
          20 de Noviembre
        </div>
      </div>

      {/* Esto no  estaría, habría una tarjeta de comentario llamada desde un map de comentarios */}
      <div className="mt-10 w-[550px] rounded-xl bg-white p-8">
        <p className="mb-2 font-satoshiBold">RAÚL SORIANO</p>
        <p className="mb-10 text-justify">
          Es uno de mis platos favoritos, esta receta me recuerda mucho a la que
          hacía mi madre. Muy sencilla de hacer y con un alto contenido en
          hierro y proteínas. Muchas gracias por compartirla.
        </p>
        <div className="flex justify-between">
          <Stars average={5}></Stars>
          16 de Noviembre
        </div>
      </div>

      <div className="text-center">
        <button className="mt-8 w-32 rounded-full bg-base-content py-1 text-base-100">
          cargar más
        </button>
      </div>
    </div>
  );
}

export default Comment;
