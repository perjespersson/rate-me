function ReviewItem({ review }) {
  return (
    <li className="border rounded bg-white p-3 d-flex justify-content-between align-items-center mt-3">
      <p className="m-0">{ review.comment }</p>

      <span className="badge text-bg-warning rounded-pill">
        <i className="bi bi-star-fill"></i> {review.rating ?? "?"}
      </span>
    </li>
  );
}

export default ReviewItem;