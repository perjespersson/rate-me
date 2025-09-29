import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchResult from './components/SearchResult';
import SearchBar from './components/SearchBar';
import Movie from './components/Movie';

// List of available movies. IDs are stored as strings to match useParams()
const availableMovies = [
  { id: "1", title: 'The Shawshank Redemption', year: 1994 },
  { id: "2", title: 'The Godfather', year: 1972 },
  { id: "3", title: 'The Dark Knight', year: 2008 },
  { id: "4", title: 'Pulp Fiction', year: 1994 },
  { id: "5", title: 'Forrest Gump', year: 1994 },
  { id: "6", title: 'Inception', year: 2010 },
  { id: "7", title: 'Interstellar', year: 2014 },
  { id: "8", title: 'Parasite', year: 2019 },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMovie, setSearchedMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!searchTerm) {
      setSearchedMovie("");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Debounce for "smoother" search
    const timer = setTimeout(() => {
      // Use "find" since the API later on only returns one item
      const searchResult = availableMovies.find(
        movie => movie.title.toLowerCase() === searchTerm.toLowerCase()
      );

      setSearchedMovie(searchResult);
      setLoading(false);
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
                      movie={searchedMovie}
                      reviews={reviews}
                      loading={loading}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </>
              }
            />

            <Route 
              path="/:id" 
              element={
                <Movie 
                  availableMovies={availableMovies} 
                  reviews={reviews} 
                  setReviews={setReviews}
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
