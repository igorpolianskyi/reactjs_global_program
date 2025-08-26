
import Counter from './components/Counter/Counter'
import SearchForm from './components/SearchForm/SearchForm'
import styles from './App.module.css'
import { useState } from 'react';
import GenreSelect from './components/GenreSelect/GenreSelect';
import { Genre, GENRES } from './constants/genre';

const COUNTER_INITIAL_VALUE = 5;

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>(Genre.ALL);

  const onSearch = (query: string) => {
    console.log(query)
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
    </div>
  )
}

export default App
