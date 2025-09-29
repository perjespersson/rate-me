import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';

function Movie({ availableMovies, reviews, setReviews }) {
  const { id } = useParams();
  const movie = availableMovies.find(m => m.id === id);
  const movieReviews = reviews.filter(r => r.movieId === movie.id);
  
  const [showModal, setShowModal] = useState(false);

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
          <h2 className="mt-2 fw-bold">{movie.title}</h2>
          <p>Released: {movie.year}</p>

          <hr className="border-secondary-subtle" />

          <div className="d-flex justify-content-between align-items-center">
            <h6 className="m-0 fw-bold">Reviews</h6>

            <div 
              className="d-flex justify-content-between align-items-center gap-2 cursor-pointer"
              onClick={() => setShowModal(true)}
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

          {showModal && (
            <ReviewModal
              setReviews={setReviews}
              setShowModal={setShowModal}
            />
          )}
        </>
      )}
    </>
  );
}

export default Movie;
