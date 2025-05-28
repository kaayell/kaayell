export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s] dark:bg-neutral-300"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s] dark:bg-neutral-300"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-300"></div>
      </div>
    </div>
  );
}
