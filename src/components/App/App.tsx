import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import React, { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent , setModalContent] = useState<Movie>()
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const handleFilmClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setModalContent(movies.find(movie => event.currentTarget.getAttribute('id') === movie.id.toString()) as Movie)
    openModal()
  };
  const handleSearch = async (query: string) => {
    setMovies([]);
    if (!query.trim().length) {
      toast.error("Please enter your search query.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetchMovies({ query });
      setMovies(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }

    if (!movies.length) {
      toast.error("No movies found for your request.");
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
      <SearchBar onSearch={handleSearch}></SearchBar>
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleFilmClick} />
      )}
    </div>
  );
}

export default App;
