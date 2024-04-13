import React, { useState } from 'react';
import axios from 'axios';
import './reviewform.css'; // Import CSS file for styling

const ReviewForm = ({ onSubmit, movieId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isRatingGiven, setIsRatingGiven] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setIsRatingGiven(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRatingGiven) return; // Don't submit if rating is not given

    try {
      // Send data to the backend including movieId
      // const response = await axios.post('http://localhost:5000/api/reviews', { movieId, rating, comment });
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId, rating, comment }),
      })
      console.log(response);

      // Reset the form state after successful submission
      setRating(0);
      setComment('');
      setIsRatingGiven(false);

      // Optionally, you can perform any other actions here
      console.log('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div>
        <label>Your Rating:</label>
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={index < rating ? "star-filled" : "star-empty"}
              onClick={() => handleRatingChange(index + 1)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      {isRatingGiven && (
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
      )}
      {isRatingGiven && (
        <button type="submit">Submit Review</button>
      )}
    </form>
  );
};

export default ReviewForm;
