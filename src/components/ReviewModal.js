import { useState } from 'react';
import { useParams } from 'react-router-dom';

function ReviewModal({ setReviews, setShowModal }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const { title } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedRating = rating ? parseFloat(rating) : "";

    setReviews(prev => [...prev, { movieTitle: title, comment: comment, rating: parsedRating }]);
    setShowModal(false);

    setComment("");
    setRating("");
  };

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center">
      <div className="modal-content p-4 rounded bg-white" style={{ width: "400px" }}>
        <h5 className="mb-3">Add Review</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Comment</label>
            <input 
              type="text"
              className="form-control"
              onChange={(e) => setComment(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input 
              type="number" 
              className="form-control" 
              onChange={(e) => setRating(e.target.value)}
              min="1" 
              max="5" 
              step="1"
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
