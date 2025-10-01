function Rating({ movie, reviews }) {
  const movieReviews = reviews.filter(review => review.movieTitle === movie.title);

  const averageRating = movieReviews.length > 0
     ? (movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length).toFixed(1)
     : "?";

  return (
    <span className="badge text-bg-warning rounded-pill">
      <i className="bi bi-star-fill"></i> {movie.rating || averageRating}
    </span>
  );
}

export default Rating;