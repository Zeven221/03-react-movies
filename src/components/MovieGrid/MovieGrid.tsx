import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
interface FilmsListProps {
  movies: Movie[];
  onSelect: (event: React.MouseEvent<HTMLLIElement>) => void;
}
export default function MovieGrid({ movies, onSelect }: FilmsListProps) {
  return (
    <>
      <ul className={css.grid}>
        {movies.map(({ id , poster_path, title }) => (
          <li key={id.toString()} onClick={onSelect} id={id.toString()} >
            <div className={css.card}>
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
