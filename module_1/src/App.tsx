
import Counter from './components/Counter/Counter'
import SearchForm from './components/SearhForm/SearchForm'
import styles from './App.module.css'

function App() {
  const counterInitialValue = 5;

  const onSearch = (query: string) => {
    console.log(query)
  }
  return (
    <div className={styles.appContainer}>
      <Counter initialValue={counterInitialValue} />
      <SearchForm onSearch={onSearch} />
    </div>
  )
}

export default App
