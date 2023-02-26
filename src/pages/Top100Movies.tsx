import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Top100MoviesList } from '../Data/Top100MoviesList';
import Navbar from '../components/Navbar';
import Ranking from '../components/Ranking';

interface MovieData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

function Top100Movies() {
  const [generatedMovie, setGeneratedMovie] = useState<MovieData[]>([]);
  const [error, setError] = useState('');

  const location = useLocation();
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;


  const fetchMovie = async () => {
    try {
      const movieResults: MovieData[] = await Promise.all(
        Top100MoviesList.map(async (movie) => {
          const res = await Axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
          return res.data;
        }),
      );
      setGeneratedMovie(movieResults);
    } catch (err) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="home">
      <Navbar currentPage={location.pathname} />
      <div className="container">
        <div className="box">
          <Ranking media={generatedMovie} type="movies" />
        </div>
      </div>
    </div>
  );
}

export default Top100Movies;
