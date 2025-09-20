import { useParams } from "react-router-dom";
import { useMovieById } from "../../hooks/use-movie-by-id";
import MovieDetails from "./MovieDetails";

const MovieDetailsWrapper: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movie, loading, error } = useMovieById(movieId!);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return <MovieDetails movie={movie} />;
};

export default MovieDetailsWrapper;