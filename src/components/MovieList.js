import MovieItem from './MovieItem';
import Spinner from './Spinner';

function MovieList({ movies, reviews, loading, searchTerm }) {
  if (loading) return <Spinner />;

  return (
    <ul className="p-0 m-0">
      {movies.length > 0 ? (
        movies.map((movie, index) => <MovieItem key={index} movie={movie} reviews={reviews} />)
      ) : (
        searchTerm && <li className="list-group-item text-center mt-4">No results</li>
      )}
    </ul>
  );
}

export default MovieList;
