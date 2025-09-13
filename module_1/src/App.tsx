
import Counter from './components/Counter/Counter'
import SearchForm from './components/SearchForm/SearchForm'
import styles from './App.module.css'
import { useState } from 'react';
import GenreSelect from './components/GenreSelect/GenreSelect';
import { COUNTER_INITIAL_VALUE, GENRES, SAMPLE_MOVIE_PULP_FICTION } from './constants/constants';
import MovieTile from './components/MovieTile/MovieTile';
import MovieDetails from './components/MovieDetails/MovieDetails';
import type { SortByOption } from './components/SortControl/SortControl';
import SortControl from './components/SortControl/SortControl';
import { Dialog } from './components/Dialog/Dialog';
import MovieForm from './components/MovieForm/MovieForm';
import type { MovieInfo } from './types/movie';


function App() {
  const [selectedGenre, setSelectedGenre] = useState<string>(GENRES[0]);
  const [sortBy, setSortBy] = useState<SortByOption>('RELEASE DATE');
  const [openModal, setOpenModal] = useState(true);

  const onSearch = (query: string) => {
    console.log(query)
  }

  const handleMovieClick = (name: string) => {
    console.log('Movie clicked:', name);
  };

  const handleEdit = (name: string) => {
    console.log('Edit movie:', name);
  };

  const handleDelete = (name: string) => {
    console.log('Delete movie:', name);
  };

  const onSortChange = (newValue: SortByOption) => {
    console.log('Sort changed:', newValue);
    setSortBy(newValue);
  };

  const onFormSubmit = (data: MovieInfo) => {
    console.log(data);
  }


  
  return (
    <div className={styles.appContainer}>
      <Counter initialValue={COUNTER_INITIAL_VALUE} />
      <SearchForm onSearch={onSearch} />
      <GenreSelect
        genres={GENRES}
        selectedGenre={selectedGenre}
        onSelect={setSelectedGenre}
      />
      <MovieTile
          movie={SAMPLE_MOVIE_PULP_FICTION}
          onClick={handleMovieClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      <MovieDetails movie={SAMPLE_MOVIE_PULP_FICTION} />

      <SortControl value={sortBy} onSortChange={onSortChange} />
      {openModal && (
        <Dialog title="Modal window" onClose={() => setOpenModal(false)}>
          <MovieForm onSubmit={onFormSubmit} />
        </Dialog>
      )}
    </div>
  )
}

export default App
