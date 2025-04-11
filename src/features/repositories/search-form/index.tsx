import { FormEvent, useState } from 'react';
import styles from './styles.module.scss';
import { useSearchParams } from 'react-router-dom';

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const [query, setQuery] = useState(searchQuery ?? '');

  const handleSearch = (searchQuery: string) => {
    setSearchParams({ ...(searchQuery ? { q: searchQuery } : {}) });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Искать репозитории..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Поиск
      </button>
    </form>
  );
};
