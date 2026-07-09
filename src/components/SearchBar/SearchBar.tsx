import styles from "./SearchBar.module.css";
interface SearchFormProps {
  onSearch: (value: string) => void;
}
function SearchBar({ onSearch }: SearchFormProps) {
  const handleSearch = async (formData: FormData) => {
    const query = formData.get("query") as string;
    onSearch(query);
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearch}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
export default SearchBar;
