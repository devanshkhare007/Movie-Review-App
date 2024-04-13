import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import routes from './route.js'; // Correct the import path

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI = 'mongodb://localhost:27017';

// Connect to MongoDB database
connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB compass');
})
.catch((error) => {
  console.error('Error connecting to MongoDB compass:', error);
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// Use your routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});