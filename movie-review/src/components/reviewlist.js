import React, { useState, useEffect } from 'react';
import './reviewlist.css';

function ReviewList({ movieId, newReview }) {
  const [reviews, setReviews] = useState([]);
  const [previousReviews, setPreviousReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.reviews);
        console.log('Response from backend:', data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Handle error
      }
    };

    fetchReviews();
  }, [movieId, newReview]);

  useEffect(() => {
    if (reviews.length !== previousReviews.length || reviews.some((r, i) => r !== previousReviews[i])) {
      const timerId = setTimeout(() => {
        const fetchReviews = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/reviews/${movieId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data.reviews);
            console.log('Response from backend:', data);
          } catch (error) {
            console.error('Error fetching reviews:', error);
            // Handle error
          }
        };

        fetchReviews();
      }, 2000);

      return () => clearTimeout(timerId);
    }
  }, [reviews, previousReviews, movieId]);

  useEffect(() => {
    setPreviousReviews(reviews);
  }, [reviews]);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star-empty">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="review-list">
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p className="rating">Rating: {renderStars(review.rating)}</p>
            <p className="comment">Comment: {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
