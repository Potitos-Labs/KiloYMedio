function LoadingCard() {
  return (
    <div className="min-w-48  hover:shadow-kym4mx-auto relative mx-4 my-4 inline-block h-64 w-48  max-w-sm flex-none flex-col items-center justify-center rounded-md border p-4 py-8 text-center shadow-md shadow">
      <div className="flex animate-pulse flex-col items-center gap-2 space-x-4">
        <div className="h-28 w-28 rounded-md bg-slate-200"></div>
      </div>
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
