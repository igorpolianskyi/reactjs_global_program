import { Outlet, useParams, useLocation } from "react-router-dom";
import { useMovieById } from "../../hooks/use-movie-by-id";
import MovieDetails from "./MovieDetails";
import { useEffect } from "react";

const MovieDetailsWrapper: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const { movie, loading, error, refetch } = useMovieById(movieId!);

  useEffect(() => {
    if (location.state?.reload) {
      refetch?.();
    }
  }, [location.state?.reload, refetch]);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <>
      <MovieDetails movie={movie} />
      <Outlet />
    </>
  );
};

export default MovieDetailsWrapper;