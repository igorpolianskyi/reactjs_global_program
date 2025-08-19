import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery = '', onSearch }) => {
  const [query, setQuery] = useState<string>(initialQuery);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="What do you want to watch?"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;