import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import Posters from '../components/Posters/Posters';
import Navbar from '../components/Navbar';

function Home() {
  const [generatedMovie, setGeneratedMovie] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();

  const fetchMovie = async (movie: string) => {
    try {
      const res = await Axios.get(`https://www.omdbapi.com/?apikey=8ece671b&s=${movie}`);
      setGeneratedMovie(res.data.Search);
    } catch (err) {
      setError('3RR0R');
    }
  };

  useEffect(() => {
    if (searchMovie) {
      fetchMovie(searchMovie);
    }
  }, [searchMovie]);

  return (
    <>
      <Navbar withSearchBar setSearchMovie={setSearchMovie} currentPage={location.pathname} />
      <div className="container">
        <div className="box">
          <Posters posters={generatedMovie} />
          {error && <p style={{ color: '#eaeaea' }}>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Home;
