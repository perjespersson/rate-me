import { Link } from 'react-router-dom';

function MovieItem({ movie, reviews }) {
  const movieReviews = reviews.filter(r => r.movieId === movie.id);

  // calculate average rating (if any reviews exist)
  const averageRating = movieReviews.length > 0
    ? (movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length).toFixed(1)
    : "?";

  return (
    <li className="border rounded bg-white p-3 d-flex justify-content-between align-items-center mt-3">
      <Link 
        to={`/${movie.id}`} 
        className="link-dark link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
      >
        <b>{movie.title} ({movie.year})</b>
      </Link>

      <span className="badge text-bg-warning rounded-pill">
        <i className="bi bi-star-fill"></i> {averageRating}
      </span>
    </li>
  );
}

export default MovieItem;
