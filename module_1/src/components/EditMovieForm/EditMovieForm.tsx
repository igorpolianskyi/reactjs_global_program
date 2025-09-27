import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieForm, { type MovieFormValues } from "../MovieForm/MovieForm";
import { Dialog } from "../Dialog/Dialog";
import { useMovieById } from "../../hooks/use-movie-by-id";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditMovieForm() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieById(movieId!);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const handleSubmit = async (data: MovieFormValues) => {
    try {
      const payload = {
        title: data.title,
        tagline: movie.tagline || " ",
        vote_average: Number(data.rating),
        vote_count: movie.vote_count || 0,
        release_date: data.releaseYear
          ? `${data.releaseYear.getFullYear()}-01-01`
          : `${movie.year}-01-01`,
        poster_path: data.movieUrl,
        overview: data.description,
        budget: movie.budget || 0,
        revenue: movie.revenue || 0,
        runtime: Number(data.runtime),
        genres: data.genres.map((g) => g.value),
        id: movie.id,
      };

      const response = await fetch(`${API_URL}/movies`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Validation error:", errorData);
        return;
      }

      const updatedMovie = await response.json();
      navigate(`/movie/${updatedMovie.id}`);
    } catch (err) {
      console.error("Failed to update movie", err);
    }
  };

  const handleClose = () => navigate(-1);

  return (
    <Dialog title="Edit Movie" onClose={handleClose}>
      <MovieForm initialMovie={movie} onSubmit={handleSubmit} />
    </Dialog>
  );
}