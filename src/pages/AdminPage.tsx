import router from "next/router";
function AdminPage() {
  return (
    <div className="flex flex-col bg-neutral">
      <div className="flex flex-col">
        <h2>Productos</h2>
        <button
          onClick={() => {
            return router.push(`/product/create`);
          }}
          className="items-center gap-2 rounded-sm bg-base-100 px-6 py-3 font-bold"
        >
          crear producto
        </button>
      </div>
      <div className="flex flex-col">
        <h1 className="font-raleway"> Recetas</h1>
        <button
          onClick={() => {
            return router.push(`/product/create`);
          }}
          className="flex items-center gap-2 rounded-full bg-base-100 px-6 py-3 font-bold"
        >
          crear receta
        </button>
      </div>
      <div className="flex flex-col">
        <h2>Talleres</h2>
        <button
          onClick={() => {
            return router.push(`/product/create`);
          }}
          className="flex items-center gap-2 rounded-full bg-base-100 px-6 py-3 font-bold"
        >
          crear talleres
        </button>
        <button
          onClick={() => {
            return router.push(`/product/create`);
          }}
          className="flex items-center gap-2 rounded-full bg-base-100 px-6 py-3 font-bold"
        >
          editar talleres
        </button>
      </div>
      <div className="flex flex-col">
        <h2>Perfil</h2>
        <button
          onClick={() => {
            return router.push(`/product/create`);
          }}
          className="flex items-center gap-2 rounded-full bg-base-100 px-6 py-3 font-bold"
        >
          crear perfil
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
