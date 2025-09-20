import React from 'react';
import type { MovieInfo } from "../../types/movie";
import { getFormatGenres } from "../../utils/get-format-genres";
import styles from './MovieDetails.module.css';

interface MovieDetailsProps {
  movie: MovieInfo;
}


const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const formatGenres = getFormatGenres(movie.genres);

  return (
    <div data-testid="movie-details" className={styles.details}>
      <img src={movie.imageUrl} alt={movie.name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.detailsContainer}>
          <h2 className={styles.name}>{movie.name}</h2>
          <span className={styles.rating}>{movie.rating}</span>
        </div>

        <span className={styles.genres}>
          {formatGenres}
        </span>

        <div className={styles.detailsContainer}>
          <p className={styles.year}>{movie.year}</p>
          <p className={styles.duration}>{movie.duration}</p>
        </div>

        <p className={styles.description}>
          {movie.description}
        </p>
      </div>
    </div>
  )
};

export default MovieDetails;
