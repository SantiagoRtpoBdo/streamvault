"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Star, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBackdropUrl, getImageUrl } from "@/config";
import { TrailerModal, MovieRow } from "@/components/movies";
import type {
  TMDbMovieDetail,
  TMDbCastMember,
  TMDbCrewMember,
  TMDbMovie,
} from "@/types";

interface MovieDetailClientProps {
  movie: TMDbMovieDetail;
  trailerKey: string | null;
  cast: TMDbCastMember[];
  director: TMDbCrewMember | null;
  similar: TMDbMovie[];
}

export function MovieDetailClient({
  movie,
  trailerKey,
  cast,
  director,
  similar,
}: MovieDetailClientProps) {
  const [trailerOpen, setTrailerOpen] = useState(false);

  const ratingPercentage = Math.round(movie.vote_average * 10);

  return (
    <>
      {/* Trailer Modal */}
      <TrailerModal
        videoKey={trailerKey}
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        title={movie.title}
      />

      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden bg-background">
        <Image
          src={getBackdropUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          fill
          className="object-cover object-top"
          priority
          quality={90}
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 gradient-overlay-left opacity-50" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-20 left-4 md:left-8 z-10"
        >
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8 -mt-48 md:-mt-64">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 self-start"
          >
            <div className="relative w-[200px] md:w-[280px] aspect-[2/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-muted">
              <Image
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 space-y-5 pt-4 md:pt-16"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              {movie.title}
            </h1>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-base italic text-muted-foreground">
                {movie.tagline}
              </p>
            )}

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary border-primary/30"
              >
                <Star className="mr-1 h-3 w-3 fill-current" />
                {movie.vote_average.toFixed(1)} ({ratingPercentage}%)
              </Badge>

              {movie.release_date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}

              {movie.runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="border-border/60 text-foreground/80"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              {trailerKey && (
                <Button
                  size="lg"
                  onClick={() => setTrailerOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
                >
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Play Trailer
                </Button>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Overview
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Director */}
            {director && (
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground">
                  Director
                </h4>
                <p className="text-sm text-muted-foreground">{director.name}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 space-y-4"
          >
            <h2 className="text-xl font-bold text-foreground">Top Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {cast.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-[120px] text-center space-y-2"
                >
                  <div className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded-full bg-secondary ring-2 ring-border">
                    <Image
                      src={getImageUrl(member.profile_path, "w200")}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {member.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        <Separator className="my-12 bg-border" />

        {/* Similar Movies */}
        {similar.length > 0 && (
          <section className="pb-8">
            <MovieRow title="You Might Also Like" movies={similar} />
          </section>
        )}
      </div>
    </>
  );
}
