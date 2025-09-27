import { useNavigate } from "react-router-dom";
import MovieForm, { type MovieFormValues } from "../MovieForm/MovieForm";
import { Dialog } from "../Dialog/Dialog";
const API_URL = import.meta.env.VITE_API_URL;


export default function AddMovieForm() {
  const navigate = useNavigate();


  const handleClose = () => navigate({
    pathname: `/`,
  });
  const handleSubmit = async (data: MovieFormValues) => {
    try {
      const payload = {
        title: data.title,
        tagline: data.tagline || " ",
        vote_average: Number(data.rating),
        vote_count: 0,
        release_date: data.releaseYear
          ? `${data.releaseYear.getFullYear()}-01-01`
          : `${new Date().getFullYear()}-01-01`,
        poster_path: data.movieUrl,
        overview: data.description,
        budget: Number(data.budget) || 0,
        revenue: Number(data.revenue) || 0,
        runtime: Number(data.runtime),
        genres: data.genres.map(g => g.value),
      };

      const response = await fetch(`${API_URL}/movies`, {
        method: "POST",
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

      const movie = await response.json();

      navigate(`/movie/${movie.id}`);
    } catch (error) {
      console.error("Failed to create movie", error);
    }
  };

  return (
    <Dialog title="Add Movie" onClose={handleClose}>
      <MovieForm onSubmit={handleSubmit} />
    </Dialog>
  );
}