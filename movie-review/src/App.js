import React, { useState } from 'react';
import axios from 'axios';
import AuthenticationPopup from './login/Authenticationpopup.js';
import Search from './search/search.js';
import Results from './search/results.js';
import Popup from './components/popup.js';
import RandomMovies from './components/randommovie.js'; // Import the RandomMovies component

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        });
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
        
        <div className="header-right">
    <button className="sign-in-btn" onClick={togglePopup}>Sign In / Login</button>
    {showPopup && <AuthenticationPopup togglePopup={togglePopup} />}
  </div>
      <header>
        
<h1>Movie Review</h1>

      </header>

      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}

        {/* Add RandomMovies component */}
        <RandomMovies openPopup={openPopup} />
      </main>
    </div>
  );
}

export default App;
