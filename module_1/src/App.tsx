
import Counter from './components/Counter/Counter'
import SearchForm from './components/SearhForm/SearchForm'
import styles from './App.module.css'
import { useState } from 'react';
import GenreSelect from './components/GenreSelect/GenreSelect';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const counterInitialValue = 5;
  const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

  const onSearch = (query: string) => {
    console.log(query)
  }
  
  return (
    <div className={styles.appContainer}>
      <Counter initialValue={counterInitialValue} />
      <SearchForm onSearch={onSearch} />
      <GenreSelect
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={setSelectedGenre}
      />
    </div>
  )
}

export default App
