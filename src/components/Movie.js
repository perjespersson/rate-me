import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';
import Rating from './Rating';
import RatingModal from './RatingModal';

function Movie({ movies, reviews, setReviews, setMovies }) {
  const { title } = useParams();
  const movie = movies.find(m => m.title === title);
  const movieReviews = reviews.filter(r => r.movieTitle === movie.title);
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  return (
    <>
      <Link to="/" className="text-dark text-decoration-none">
        <div className="d-flex justify-content-start align-items-center gap-2">
          <i className="bi bi-arrow-left-circle"></i>
          <p className="m-0 fs-7">Go back to search</p>
        </div>
      </Link>

      <hr className="border-secondary-subtle" />

      {!movie ? (
        <div className="text-center mt-4">
          <h2 className="fw-bold">Movie not found</h2>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <h2 className="fw-bold">{movie.title}</h2>

            <div className="d-flex justify-content-start align-items-center gap-2">
              <Rating movie={movie} reviews={reviews} />

              <i
                className="bi bi-pencil-square fs-7 cursor-pointer"
                onClick={() => setShowRatingModal(true)}
              ></i>
            </div>

            {showRatingModal && (
              <RatingModal
                movie={movie}
                setMovies={setMovies}
                setShowRatingModal={setShowRatingModal}
              />
            )}
          </div>

          <p>Released: {movie.year}</p>

          <hr className="border-secondary-subtle" />

          <div className="d-flex justify-content-between align-items-center">
            <h6 className="m-0 fw-bold">Reviews</h6>

            <div 
              className="d-flex justify-content-between align-items-center gap-2 cursor-pointer"
              onClick={() => setShowReviewModal(true)}
            >
              <i className="bi bi-plus-circle"></i>
              <p className="m-0 fs-7">New review</p>
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

          {showReviewModal && (
            <ReviewModal
              setReviews={setReviews}
              setShowReviewModal={setShowReviewModal}
            />
          )}
        </>
      )}
    </>
  );
}

export default Movie;