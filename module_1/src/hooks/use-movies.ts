import { useEffect, useState } from "react";
import type { ApiMovie, MovieInfo } from "../types/movie";

interface UseMoviesProps {
  search: string;
  sortBy: string;
  filter: string;
  sortOrder?: string;
  searchBy?: string;
}

export function useMovies({ search, sortBy, filter, sortOrder = 'desc', searchBy = 'title' }: UseMoviesProps) {
  const [movieList, setMovieList] = useState<MovieInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          search,
          sortBy,
          filter,
          sortOrder,
          searchBy
        });

        const response = await fetch(`http://localhost:4000/movies?${params.toString()}`, {
          signal: controller.signal
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        const movies: MovieInfo[] = (data.data as ApiMovie[]).map(movie => ({
          id: movie.id,
          name: movie.title,
          year: new Date(movie.release_date).getFullYear(),
          genres: movie.genres,
          imageUrl: movie.poster_path,
          rating: movie.vote_average,
          duration: `${movie.runtime} min`,
          description: movie.overview,
        }));

        setMovieList(movies);
      } catch (err: unknown) {
          if (err instanceof DOMException && err.name === "AbortError") {
            return;
          }
          setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [search, sortBy, filter, sortOrder, searchBy]);

  return { movieList, loading, error };
}