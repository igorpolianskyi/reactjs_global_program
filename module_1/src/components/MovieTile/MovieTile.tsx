import React, { useState } from 'react';
import styles from './MovieTile.module.css';
import { getFormatGenres } from '../../utils/get-format-genres';
import type { MovieInfo } from '../../types/movie';

interface MovieTileProps {
  movie: MovieInfo;
  onClick?: (id: number) => void;
  onEdit?: (name: string) => void;
  onDelete?: (name: string) => void;
}

const MovieTile: React.FC<MovieTileProps> = ({ movie, onClick, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const formatGenres = getFormatGenres(movie.genres);


  const handleClick = () => {
    onClick?.(movie.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('handleEdit')
    onEdit?.(movie.name);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('handleDelete');
    onDelete?.(movie.name);
  };

  return (
    <div 
      data-testid="movie-tile"
      data-movie-id={movie.id} 
      className={styles.tile}
      onClick={handleClick}
      >
      <img src={movie.imageUrl} alt={movie.name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{movie.name}</h3>
        <p className={styles.year}>{movie.year}</p>
      </div>
      <p className={styles.genres}>{formatGenres}</p>

      {menuOpen ? (
        <div className={styles.menu}>
          <button className={styles.closeButton} onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
          }}
          >
            ✕
          </button>
          <button className={styles.selectButton} onClick={handleEdit}>Edit</button>
          <button className={styles.selectButton} onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <button className={styles.menuButton} onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(true);
        }}>
          ⋮
        </button>
      )}
    </div>
  );
};

export default MovieTile;