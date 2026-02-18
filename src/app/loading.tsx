import { HeroSkeleton, MovieRowSkeleton } from "@/components/movies";

export default function HomeLoading() {
  return (
    <div className="space-y-10 pb-12">
      <HeroSkeleton />
      <div className="space-y-10 -mt-16 relative z-10">
        <MovieRowSkeleton />
        <MovieRowSkeleton />
        <MovieRowSkeleton />
        <MovieRowSkeleton />
      </div>
    </div>
  );
}
