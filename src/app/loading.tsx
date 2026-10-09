export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      <div className="mb-8 h-64 animate-pulse rounded-2xl bg-gray-200" />


      <div className="mb-4 h-7 w-48 animate-pulse rounded bg-gray-200" />

  
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}