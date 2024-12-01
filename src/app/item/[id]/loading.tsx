export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Story Header Skeleton */}
      <article className="bg-white rounded-lg p-6 mb-6">
        <div className="flex gap-4">
          {/* Score Circle Skeleton */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1">
            <div className="h-6 bg-gray-100 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </article>

      {/* Comments Section Skeleton */}
      <div className="bg-white rounded-lg p-6">
        <div className="h-6 bg-gray-100 rounded w-1/4 mb-6 animate-pulse" />
        
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
