import Spinner from './Spinner';
import MovieItem from './MovieItem';

function SearchResult({ searchedMovie, movies, loading, searchTerm, setSearchTerm, error, reviews }) {
  if (loading) return <Spinner />;

  return (
    <ul className="p-0 m-0">
      {searchedMovie ? (
        <MovieItem
          movie={searchedMovie}
          setSearchTerm={setSearchTerm}
          reviews={reviews}
        />
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <MovieItem
            key={movie.title}
            movie={movie}
            setSearchTerm={setSearchTerm}
            reviews={reviews}
          />
        ))
      ) : (
        searchTerm && (
          <li className="list-group-item text-center mt-4">{error}</li>
        )
      )}
    </ul>
  );
}

export default SearchResult;