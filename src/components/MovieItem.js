import { Link } from 'react-router-dom';
import Rating from './Rating';

function MovieItem({ movie, setSearchTerm, reviews }) {
  return (
    <li className="border rounded bg-white p-3 d-flex justify-content-between align-items-center mt-3">
      <Link 
        to={`/${movie.title}`} 
        className="link-dark link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
        onClick={() => setSearchTerm("")} 
      >
        <b>{movie.title} ({movie.year})</b>
      </Link>

      <Rating 
        movie={movie}
        reviews={reviews}
      />
    </li>
  );
}

export default MovieItem;