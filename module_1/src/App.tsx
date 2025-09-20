import styles from './App.module.css'
import MovieListPage from './components/MovieListPage/MovieListPage'


function App() {
  return (
    <div className={styles.appContainer}>
      <MovieListPage />
    </div>
  )
}

export default App;
