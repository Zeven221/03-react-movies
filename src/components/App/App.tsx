import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Movie | null>();
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const handleMovieClick = (movie: object) => {
    console.log(movies.find(elem => elem === movie))
    setModalContent(null)
    openModal()
  };
  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsError(false);
    try {
      setIsLoading(true);
      const response = await fetchMovies({ query });
      if (!response.length) {
        toast.error("No movies found for your request.");
        return
      }
      setMovies(response);
      
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <Toaster />
      {isModalOpen && (
        <MovieModal onClose={closeModal} movie={modalContent as Movie} />
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleMovieClick}/>
      )}
    </div>
  );
}

export default App;
