import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Results from '../search/results';

const RandomMovies = ({ openPopup }) => { // Accept openPopup as a prop
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    const fetchRandomMovies = async (keyword) => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=dfe6d885&s=${keyword}`);
        setRandomMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching random movies:', error);
      }
    };

    const getRandomKeyword = () => {
      const keywords = ['action', 'comedy', 'drama', 'adventure', 'horror', 'sci-fi','marvel','brother','starwar'];
      const randomIndex = Math.floor(Math.random() * keywords.length);
      return keywords[randomIndex];
    };

    const keyword = getRandomKeyword();
    fetchRandomMovies(keyword);
  }, []);

  return (
    <div>
      <h2>Random Movies</h2>
      <Results results={randomMovies} openPopup={openPopup} /> {/* Use the Results component */}
    </div>
  );
};

export default RandomMovies;
