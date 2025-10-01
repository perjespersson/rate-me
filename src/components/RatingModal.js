import { useState } from 'react';

function RatingModal({ movie, setMovies, setShowRatingModal }) {
  const [rating, setRating] = useState(movie.rating || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMovies(prevMovies =>
      prevMovies.map(m =>
        m.title === movie.title ? { ...m, rating: rating } : m
      )
    );

    setShowRatingModal(false);
  };

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center">
      <div className="modal-content p-4 rounded bg-white" style={{ width: "300px" }}>
        <h5 className="mb-3">Edit Rating</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input
              type="number"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              step="1"
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowRatingModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatingModal;