import styles from './GenreSelect.module.css';
import React from 'react';

interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
}

const GenreSelect: React.FC<GenreSelectProps> = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div className={styles.genreSelect}>
      {genres.map((genre) => (
        <button
          key={genre}
          className={`${styles.genreTab} ${
            genre === selectedGenre ? styles.active : ''
          }`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelect;