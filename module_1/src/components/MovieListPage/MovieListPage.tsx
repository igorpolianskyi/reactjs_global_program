import { useState } from 'react';
import styles from './MovieListPage.module.css';
import type { MovieInfo } from '../../types/movie';
import SearchForm from '../SearchForm/SearchForm';
import MovieDetails from '../MovieDetails/MovieDetails';
import GenreSelect from '../GenreSelect/GenreSelect';
import { GENRES } from '../../constants/constants';
import SortControl, { type SortByOption } from '../SortControl/SortControl';
import MovieTile from '../MovieTile/MovieTile';
import { useMovies } from '../../hooks/use-movies';
import { FaSearch } from 'react-icons/fa';

const MovieListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriterion, setSortCriterion] = useState<SortByOption>('RELEASE DATE');
  const [activeGenre, setActiveGenre] = useState('ALL');
  const [selectedMovie, setSelectedMovie] = useState<MovieInfo | undefined>(undefined);

  const sortString = sortCriterion.toLowerCase().replaceAll(" ", "_");

  const { movieList, loading, error } = useMovies({
    search: searchQuery,
    sortBy: sortString,
    filter: activeGenre && activeGenre !== 'ALL' ? activeGenre : '',
    sortOrder: sortString === 'RELEASE DATE' ? 'desc' : 'asc',
  });

  const onSearch = (query: string) => setSearchQuery(query);
  const onSortChange = (newValue: SortByOption) => setSortCriterion(newValue);

  const handleMovieClick = (id: number) => {
    const movieInfo = movieList.find(movie => movie.id === id);
    setSelectedMovie(movieInfo);
  };

  return (
    <div className={styles.movieListPage}>
      <div className={styles.movieListHeader}>
        <span className={styles.logo}>netflixroulette</span>
        {selectedMovie && (
          <button
            className={styles.searchButton}
            onClick={() => {
              setSelectedMovie(undefined);
            }}>
            <FaSearch />
          </button>
        )}
      </div>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <SearchForm initialQuery={searchQuery} onSearch={onSearch} />
      )}

      <div className={styles.movieListBar}>
        <GenreSelect
          genres={GENRES}
          selectedGenre={activeGenre}
          onSelect={setActiveGenre}
        />

        <SortControl value={sortCriterion} onSortChange={onSortChange} />
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}

      <div className={styles.movieListGrid}>
        {Array.isArray(movieList) &&
          movieList.map(movie => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onClick={handleMovieClick}
              onEdit={console.log}
              onDelete={console.log}
            />
          ))}
      </div>
    </div>
  );
}

export default MovieListPage;