import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchResult from './components/SearchResult';
import SearchBar from './components/SearchBar';
import Movie from './components/Movie';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState(""); // "DB" should probably be on the backend but since I had it here in part 1, I decided to keep it
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    // Reset search onClear
    if (!searchTerm) {
      setSearchedMovie("");
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5267/api/movie?title=${encodeURIComponent(searchTerm)}`);
        const searchResult = await response.json();

        if (!response.ok) {
          setSearchedMovie("");
          setError(searchResult.error);
        } else {
          setSearchedMovie(searchResult);
          setError("");

          // Add searchedMovie to movies if it is not already present
          setMovies(prev => {
            const exists = prev.some(m => m.title === searchResult.title);
            return exists ? prev : [...prev, { ...searchResult, rating: null }]; // Not the best solution, but since a movie can have multiple reviews we need one that can override the average
          });
        }
      } catch {
        setSearchedMovie("");
        setError("Unable to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 bg-light-subtle border rounded p-4">
          <Routes>
            <Route
              path="/"
              element={
                  <>
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                    
                    <SearchResult
                      searchedMovie={searchedMovie}
                      movies={movies}
                      loading={loading}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      error={error}
                      reviews={reviews}
                    />
                  </>
              }
            />

            <Route 
              path="/:title"
              element={
                <Movie 
                  movies={movies} 
                  reviews={reviews} 
                  setReviews={setReviews}
                  setMovies={setMovies}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
