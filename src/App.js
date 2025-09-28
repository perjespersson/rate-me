import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([{ movieId: 1, comment: "Väldigt bra film..", rating: 7.6}])

  const movies = [
    { id: 1, title: 'The Shawshank Redemption', year: 1994},
    { id: 2, title: 'The Godfather', year: 1972},
    { id: 3, title: 'The Dark Knight', year: 2008},
    { id: 4, title: 'Pulp Fiction', year: 1994},
    { id: 5, title: 'Forrest Gump', year: 1994},
    { id: 6, title: 'Inception', year: 2010},
    { id: 7, title: 'Interstellar', year: 2014},
    { id: 8, title: 'Parasite', year: 2019},
  ];

  useEffect(() => {
    if (!searchTerm) {
      setFilteredMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase() === searchTerm.toLowerCase()
      );

      setFilteredMovies(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const clearInput = () => {
    setSearchTerm("");
    setFilteredMovies([]);
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      { /* Clean up.. */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="row justify-content-center">
              <div className="col-lg-6 bg-light-subtle border rounded p-4">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onClear={clearInput}
                />
                <MovieList
                  movies={filteredMovies}
                  reviews={reviews}
                  loading={loading}
                  searchTerm={searchTerm}
                />
              </div>
            </div>
          }
        />

        <Route 
          path="/:id" 
          element={<MovieDetails movies={movies} reviews={reviews} setReviews={setReviews} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
