import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]">
      <div className="aspect-[2/3] w-full rounded-lg shimmer" />
      <Skeleton className="mt-2 h-4 w-3/4" />
      <Skeleton className="mt-1 h-3 w-1/3" />
    </div>
  );
}

export function MovieRowSkeleton() {
  return (
    <section className="space-y-4 px-4 md:px-8">
      <Skeleton className="h-7 w-40" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[75vh] min-h-[550px] md:h-[85vh] w-full bg-background">
      <div className="absolute inset-0 shimmer" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
        <Skeleton className="h-12 w-96 max-w-full" />
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-20 w-[600px] max-w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-11 w-36 rounded-lg" />
          <Skeleton className="h-11 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-[50vh] md:h-[65vh] w-full shimmer" />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 -mt-48 md:-mt-64 relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-[200px] md:w-[280px] aspect-[2/3] rounded-xl flex-shrink-0 shimmer" />
          <div className="flex-1 space-y-4 pt-4 md:pt-16">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-5 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
