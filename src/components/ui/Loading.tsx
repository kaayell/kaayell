export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-neutral-500"></div>
      </div>
    </div>
  );
}
