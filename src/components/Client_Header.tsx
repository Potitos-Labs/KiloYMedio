function Client_Header() {
  return (
    <div className="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
      <a href="">
        <img
          src="img/carrito.png"
          alt="carrito-img"
          className="h-12 w-12 rounded shadow-sm"
        ></img>
      </a>
      <a href="">
        <img
          src="img/perfil.png"
          alt="perfil-img"
          className="h-12 w-12 rounded shadow-sm"
        ></img>
      </a>
    </div>
  );
}
export default Client_Header;
