import React, { useState } from 'react';
import Popup from './popup.js';
import ReviewList from './reviewlist.js';

function MovieDetails({ selected }) {
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [newReview, setNewReview] = useState(null);

  const handleReviewSubmit = (review) => {
    setIsReviewSubmitted(true);
    setNewReview(review); // Set the newly submitted review
  };

  return (
    <div>
      {/* Popup for displaying movie details and submitting reviews */}
      <Popup selected={selected} closePopup={() => setIsReviewSubmitted(false)}>
        <ReviewForm movieId={selected.imdbID} onSubmit={handleReviewSubmit} />
      </Popup>

      {/* ReviewList for displaying all reviews */}
      <ReviewList movieId={selected.imdbID} isReviewSubmitted={isReviewSubmitted} newReview={newReview} />
    </div>
  );
}

export default MovieDetails;
