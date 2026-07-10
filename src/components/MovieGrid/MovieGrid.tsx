import type React from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: object) => void;
}
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const handleSelectMovie = (event:  React.MouseEvent<HTMLDivElement>) => {
    onSelect(event.currentTarget)
  }
  return (
    <>
      <ul className={css.grid}>
        {movies.map(({ id , poster_path, title }) => (
          <li key={id}>
            <div className={css.card} onClick={handleSelectMovie}>
              <img
                className={css.image}
                src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                alt={title}
                loading="lazy"
              />
              <h2 className={css.title}>{title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
