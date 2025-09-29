import Spinner from './Spinner';
import { Link } from 'react-router-dom';

function SearchResult({ movie, reviews, loading, searchTerm, setSearchTerm }) {
  if (loading) return <Spinner />;

  return (
    <ul className="p-0 m-0">
      {movie ? (
        <li className="border rounded bg-white p-3 d-flex justify-content-between align-items-center mt-3">
          <Link 
            to={`/${movie.id}`} 
            className="link-dark link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
            onClick={() => setSearchTerm("")} 
          >
            <b>{movie.title} ({movie.year})</b>
          </Link>
        </li>
      ) : (
        searchTerm && (
          <li className="list-group-item text-center mt-4">No results</li>
        )
      )}
    </ul>
  );
}

export default SearchResult;