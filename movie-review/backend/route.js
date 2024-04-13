// routes.js

import { Router } from 'express';
const router = Router();
import Review from './models/review.js'; // Fix import statement for the Review model
import User from './models/user.js';

// Define routes
router.post('/api/reviews', async (req, res) => {
    try {
        // Extract data from request body
        const { movieId, rating, comment } = req.body;

        // Perform any necessary processing or validation
        
        // Store data (if needed)
        // For example, using Mongoose to save review data to MongoDB
        const newReview = new Review({ movieId, rating, comment }); // Fix model instantiation
        await newReview.save();

        // Send success response
        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/api/reviews/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviews = await Review.find({ movieId }); // Find reviews by movieId in the database
        res.json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user sign up
router.post('/api/signup', async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password } = req.body;

        // Perform validation and error handling
        
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user log in
router.post('/api/login', async (req, res) => {
    try {
        // Extract user data from request body
        const { email, password } = req.body;

        // Perform validation and error handling
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Send success response
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
