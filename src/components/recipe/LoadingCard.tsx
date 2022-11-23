function LoadingCard() {
  return (
    <div className="w-30 mx-20 my-4 h-64 w-48 rounded-md shadow-md hover:shadow-kym4">
      <div className="relative h-32 overflow-hidden rounded-t-md bg-slate-200 object-contain"></div>
      <div className="mt-4 w-full flex-1 space-y-6 px-4 py-1">
        <div className="h-2 w-full rounded bg-slate-200"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-200"></div>
            <div className="col-span-1 h-2 rounded bg-slate-200"></div>
          </div>
          <div className="h-2 rounded bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
export default LoadingCard;
