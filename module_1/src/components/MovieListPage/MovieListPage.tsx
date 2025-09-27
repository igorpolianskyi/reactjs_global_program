import styles from './MovieListPage.module.css';
import GenreSelect from '../GenreSelect/GenreSelect';
import { GENRES } from '../../constants/constants';
import SortControl, { type SortByOption } from '../SortControl/SortControl';
import MovieTile from '../MovieTile/MovieTile';
import { useMovies } from '../../hooks/use-movies';
import { FaSearch } from 'react-icons/fa';
import { useUpdateSearchParams } from '../../hooks/use-update-search-params';
import { createSearchParams, Outlet, useNavigate, useParams } from 'react-router-dom';

const MovieListPage: React.FC = () => {
  const { searchParams, updateParams } = useUpdateSearchParams();
  const navigate = useNavigate();
  const { movieId } = useParams();

  const query = searchParams.get("query") || "";
  const sortBy = (searchParams.get("sortBy") || "RELEASE DATE").toUpperCase() as SortByOption;
  const genre = (searchParams.get("genre") || "ALL").toUpperCase();
  const sortString = sortBy.toLowerCase().replaceAll(" ", "_");

  const { movieList, loading, error } = useMovies({
    search: query,
    sortBy: sortString,
    filter: genre && genre !== 'ALL' ? genre : '',
    sortOrder: sortString === 'RELEASE DATE' ? 'desc' : 'asc',
  });

  const onSortChange = (newValue: SortByOption) => updateParams({ sortBy: newValue });
  const onGenreChange = (newGenre: string) => updateParams({ genre: newGenre });
  const handleMovieClick = (id: number) => {
    navigate({
      pathname: `/movie/${id}`,
      search: createSearchParams(Object.fromEntries(searchParams)).toString()
    });
  };

  const searchButtonClick = () => {
    navigate({
      pathname: `/`,
      search: createSearchParams(Object.fromEntries(searchParams)).toString(),
    });
  }

  return (
    <div className={styles.movieListPage}>
      <div className={styles.movieListHeader}>
        <span className={styles.logo}>netflixroulette</span>
        {movieId && (
          <button
            data-testid="search-button"
            className={styles.searchButton}
            onClick={searchButtonClick}>
            <FaSearch />
          </button>
        )}
      </div>

      <Outlet />

      <div className={styles.movieListBar}>
        <GenreSelect
          genres={GENRES}
          selectedGenre={genre}
          onSelect={onGenreChange}
        />

        <SortControl value={sortBy} onSortChange={onSortChange} />
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