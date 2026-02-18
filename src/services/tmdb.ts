import { TMDB_CONFIG } from "@/config";
import type {
  TMDbPaginatedResponse,
  TMDbMovie,
  TMDbMovieDetail,
  TMDbGenre,
} from "@/types";

// ──────────────────────────────────────────────────────────
// Base HTTP Client for TMDb
// ──────────────────────────────────────────────────────────

class TMDbClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = TMDB_CONFIG.baseUrl;
    this.apiKey = TMDB_CONFIG.apiKey;
  }

  private buildUrl(
    endpoint: string,
    params: Record<string, string> = {},
  ): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set("api_key", this.apiKey);
    url.searchParams.set("language", "en-US");

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  }

  async get<T>(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(
        `TMDb API Error: ${response.status} ${response.statusText} — ${endpoint}`,
      );
    }

    return response.json() as Promise<T>;
  }
}

// ──────────────────────────────────────────────────────────
// Singleton Instance
// ──────────────────────────────────────────────────────────

const client = new TMDbClient();

// ──────────────────────────────────────────────────────────
// Movie Service
// ──────────────────────────────────────────────────────────

export const movieService = {
  /**
   * Fetch trending movies for the week.
   */
  async getTrending(
    page: number = 1,
  ): Promise<TMDbPaginatedResponse<TMDbMovie>> {
    return client.get<TMDbPaginatedResponse<TMDbMovie>>(
      "/trending/movie/week",
      {
        page: String(page),
      },
    );
  },

  /**
   * Fetch popular movies.
   */
  async getPopular(
    page: number = 1,
  ): Promise<TMDbPaginatedResponse<TMDbMovie>> {
    return client.get<TMDbPaginatedResponse<TMDbMovie>>("/movie/popular", {
      page: String(page),
    });
  },

  /**
   * Fetch top-rated movies.
   */
  async getTopRated(
    page: number = 1,
  ): Promise<TMDbPaginatedResponse<TMDbMovie>> {
    return client.get<TMDbPaginatedResponse<TMDbMovie>>("/movie/top_rated", {
      page: String(page),
    });
  },

  /**
   * Fetch upcoming movies.
   */
  async getUpcoming(
    page: number = 1,
  ): Promise<TMDbPaginatedResponse<TMDbMovie>> {
    return client.get<TMDbPaginatedResponse<TMDbMovie>>("/movie/upcoming", {
      page: String(page),
    });
  },

  /**
   * Fetch full movie details including videos, credits, and similar movies.
   */
  async getDetails(movieId: number): Promise<TMDbMovieDetail> {
    return client.get<TMDbMovieDetail>(`/movie/${movieId}`, {
      append_to_response: "videos,credits,similar",
    });
  },

  /**
   * Search movies by query string.
   */
  async search(
    query: string,
    page: number = 1,
  ): Promise<TMDbPaginatedResponse<TMDbMovie>> {
    return client.get<TMDbPaginatedResponse<TMDbMovie>>("/search/movie", {
      query,
      page: String(page),
      include_adult: "false",
    });
  },

  /**
   * Fetch all movie genres.
   */
  async getGenres(): Promise<TMDbGenre[]> {
    const data = await client.get<{ genres: TMDbGenre[] }>("/genre/movie/list");
    return data.genres;
  },

  /**
   * Fetch movies by genre.
   */
  async getByGenre(
    genreId: number,
    page: number = 1,
  ): Promise<TMDbPaginatedResponse<TMDbMovie>> {
    return client.get<TMDbPaginatedResponse<TMDbMovie>>("/discover/movie", {
      with_genres: String(genreId),
      sort_by: "popularity.desc",
      page: String(page),
    });
  },
};
