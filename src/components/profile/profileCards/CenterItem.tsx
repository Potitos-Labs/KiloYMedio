function CenterItem() {
  return (
    <div className="mt-3 overflow-hidden rounded-md border-[1px] border-neutral">
      <div className="border-b-[1px] border-neutral py-6 px-4 text-lg">
        recetas guardadas
      </div>
      <div className="border-b-[1px] border-neutral py-6 px-4 text-lg">
        mis alergenos
      </div>
      <div className="border-b-[1px] border-neutral py-6 px-4 text-lg">
        pedidos
      </div>
      <div className="py-6 px-4 text-lg">mis talleres</div>
    </div>
  );
}

export default CenterItem;
