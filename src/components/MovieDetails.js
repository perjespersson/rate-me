import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';

function MovieDetails({ movies, reviews, setReviews }) {
  const { id } = useParams();
  const movie = movies.find(m => m.id.toString() === id);
  const [showModal, setShowModal] = useState(false);

  const movieReviews = movie ? reviews.filter(r => r.movieId === movie.id) : [];

  const handleAddReview = (comment, rating) => {
    if (!movie) return;
    setReviews(prev => [...prev, { movieId: movie.id, comment, rating }]);
    setShowModal(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 bg-light-subtle border rounded pb-4 ps-4 pe-4">
        {/* Back to search link (only once) */}
        <Link to="/" className="text-dark text-decoration-none">
          <div className="d-flex justify-content-start align-items-center gap-2 mt-3">
            <i className="bi bi-arrow-left-circle"></i>
            <p className="m-0" style={{ fontSize: "14px" }}>Go back to search</p>
          </div>
        </Link>

        <hr className="border-secondary-subtle" />

        {!movie ? (
          <div className="text-center mt-4">
            <h2>
              <b>Movie not found</b>
            </h2>
          </div>
        ) : (
          <>
            <h2 className="mt-2">
              <b>{movie.title}</b>
            </h2>
            <p>Released: {movie.year}</p>

            <hr className="border-secondary-subtle" />

            <div className="d-flex justify-content-between align-items-center">
              <h6 className="m-0"><b>Reviews</b></h6>

              <div 
                className="d-flex justify-content-between align-items-center gap-2 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-circle"></i>
                <p className="m-0" style={{ fontSize: "14px", cursor: "pointer" }}>New review</p>
              </div>
            </div>

            <ul className="p-0 m-0">
              {movieReviews.length > 0 ? (
                movieReviews.map((review, index) => (
                  <ReviewItem key={index} review={review} />
                ))
              ) : (
                <li className="list-group-item text-center mt-4">No reviews</li>
              )}
            </ul>

            {showModal && (
              <ReviewModal 
                onClose={() => setShowModal(false)} 
                onSave={handleAddReview} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;