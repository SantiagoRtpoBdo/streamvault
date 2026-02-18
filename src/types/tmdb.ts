// ──────────────────────────────────────────────────────────
// TMDb API Response Types
// ──────────────────────────────────────────────────────────

export interface TMDbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
  media_type?: string;
}

export interface TMDbMovieDetail extends Omit<TMDbMovie, "genre_ids"> {
  genres: TMDbGenre[];
  runtime: number | null;
  tagline: string | null;
  status: string;
  budget: number;
  revenue: number;
  production_companies: TMDbProductionCompany[];
  spoken_languages: TMDbSpokenLanguage[];
  homepage: string | null;
  imdb_id: string | null;
  belongs_to_collection: TMDbCollection | null;
  videos?: {
    results: TMDbVideo[];
  };
  credits?: {
    cast: TMDbCastMember[];
    crew: TMDbCrewMember[];
  };
  similar?: {
    results: TMDbMovie[];
  };
}

export interface TMDbGenre {
  id: number;
  name: string;
}

export interface TMDbVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TMDbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
}

export interface TMDbCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDbProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TMDbSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDbCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type TMDbSearchResponse = TMDbPaginatedResponse<TMDbMovie>;

// ──────────────────────────────────────────────────────────
// Application-level Types
// ──────────────────────────────────────────────────────────

export type MovieCategory = "trending" | "popular" | "top_rated" | "upcoming";

export interface MovieSection {
  id: MovieCategory;
  title: string;
  endpoint: string;
}

export type ImageSize = "w200" | "w300" | "w400" | "w500" | "w780" | "original";
export type BackdropSize = "w300" | "w780" | "w1280" | "original";
export type ProfileSize = "w45" | "w185" | "h632" | "original";
