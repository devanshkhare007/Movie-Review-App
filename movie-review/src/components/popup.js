import React, { useState } from 'react';
import ReviewForm from './reviewform.js'; // Import the ReviewForm component
import ReviewList from './reviewlist.js';

function Popup({ selected, closePopup }) {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Function to handle review submission
  const handleReviewSubmission = () => {
    // Update state to indicate that a review has been submitted after a delay
    setTimeout(() => {
      setReviewSubmitted(true);
    }, 1000); // Delay in milliseconds
  };

  return (
    <section className="popup">
      <div className="content">
        <h2>{selected.Title} <span>({selected.Year})</span></h2>
        <p className="rating">Rating: {selected.imdbRating}</p>
        <div className="plot">
          <img src={selected.Poster} alt="Poster" />
          <p>{selected.Plot}</p>
        </div>
        <button className="close" onClick={closePopup}>Close</button>

        {/* Review Form */}
        <ReviewForm movieId={selected.imdbID} onReviewSubmit={handleReviewSubmission} />
        
        {/* Review list */}
        <ReviewList movieId={selected.imdbID} reviewSubmitted={reviewSubmitted} />
      </div>
    </section>
  );
}

export default Popup;
