import { useEffect, useState, useCallback } from "react";
import type { ApiMovie, MovieInfo } from "../types/movie";
const API_URL = import.meta.env.VITE_API_URL;

export function useMovieById(id: string | number) {
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovie = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/movies/${id}`);

      if (!response.ok) {
        if (response.status === 404) throw new Error("Movie not found");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiMovie = await response.json();

      const movie: MovieInfo = {
        id: data.id,
        name: data.title,
        year: new Date(data.release_date).getFullYear(),
        genres: data.genres,
        imageUrl: data.poster_path,
        rating: data.vote_average,
        duration: `${data.runtime} min`,
        description: data.overview,
        tagline: data.tagline || "",
        budget: data.budget || 0,
        revenue: data.revenue || 0,
        vote_count: data.vote_count || 0,
      };

      setMovie(movie);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch movie");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  return { movie, loading, error, refetch: fetchMovie };
}