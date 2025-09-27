import { useEffect, useState } from "react";
import type { ApiMovie, MovieInfo } from "../types/movie";
const API_URL = import.meta.env.VITE_API_URL;

export function useMovieById(id: string | number) {
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/movies/${id}`, {
          signal: controller.signal,
        });

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
        };

        setMovie(movie);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();

    return () => controller.abort();
  }, [id]);

  return { movie, loading, error };
}