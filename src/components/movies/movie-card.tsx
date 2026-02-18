"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getImageUrl } from "@/config";
import type { TMDbMovie } from "@/types";

interface MovieCardProps {
  movie: TMDbMovie;
  index?: number;
  priority?: boolean;
}

export function MovieCard({
  movie,
  index = 0,
  priority = false,
}: MovieCardProps) {
  const ratingColor =
    movie.vote_average >= 7
      ? "text-green-400"
      : movie.vote_average >= 5
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="group relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] cursor-pointer"
    >
      <Link
        href={`/movie/${movie.id}`}
        aria-label={`View details for ${movie.title}`}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-secondary">
          <Image
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
            className="object-cover transition-all duration-500 group-hover:brightness-110"
            priority={priority}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
            <Star className={`h-3 w-3 fill-current ${ratingColor}`} />
            <span className={`text-xs font-semibold ${ratingColor}`}>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Title on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-semibold text-white line-clamp-2 drop-shadow-lg">
              {movie.title}
            </p>
            {movie.release_date && (
              <p className="mt-1 text-xs text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </p>
            )}
          </div>
        </div>

        {/* Title below card */}
        <div className="mt-2 space-y-0.5">
          <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </p>
          {movie.release_date && (
            <p className="text-xs text-muted-foreground">
              {new Date(movie.release_date).getFullYear()}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
