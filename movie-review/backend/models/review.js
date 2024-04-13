// models/Review.js

import mongoose from 'mongoose';

// Define schema for movie reviews
const reviewSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

// Create a model for movie reviews
const Review = mongoose.model('Review', reviewSchema);

export default Review;
