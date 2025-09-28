import { useState } from 'react';

function ReviewModal({ onClose, onSave }) {
  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState(null);

  const handleSubmit = () => {
    const parsedRating = rating ? parseFloat(rating) : null;
    onSave(comment, parsedRating);

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
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input 
              type="number" 
              className="form-control" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              min="0" 
              max="10" 
              step="0.1"
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
