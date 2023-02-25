import React, { useState, useEffect, lazy, useMemo } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Posters = lazy(() => import('../components/Posters/Posters'));


function Home() {
  const [generatedMovie, setGeneratedMovie] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  
  const fetchMovie = async (movie: string) => {
    try {
      const res = await Axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`);
      setGeneratedMovie(res.data.Search);
      console.log(generatedMovie)
    } catch (err) {
      setError('3RR0R');
    }
  };

  useEffect(() => {
    if (searchMovie) {
      fetchMovie(searchMovie);
    }
  }, [searchMovie]);

  const PostersMemo = useMemo(() => <Posters posters={generatedMovie} />, [generatedMovie]);

  return (
    <>
      <Navbar withSearchBar setSearchMovie={setSearchMovie} currentPage={location.pathname} />
      <div className="container"> 
        <div className="box">
          {PostersMemo}
          {error && <p style={{ color: '#eaeaea' }}>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Home;
