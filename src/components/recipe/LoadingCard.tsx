function LoadingCard() {
  return (
    <div className="min-w-48 w-fill border-2a  relative mx-4 my-4 inline-block h-64 max-w-sm flex-none flex-col items-center justify-center rounded-md border  text-center shadow-md hover:shadow-kym4">
      <div className="w-fill  relative h-32 overflow-hidden rounded-t-md bg-slate-200 object-contain"></div>
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
