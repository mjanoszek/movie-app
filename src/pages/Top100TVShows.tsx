import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Top100TvShowsList } from '../Data/Top100TvShowsList';
import Navbar from '../components/Navbar';
import Ranking from '../components/Ranking';

interface ShowData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

function Top100Movies() {
  const [generatedTVShow, setGeneratedTVShow] = useState<ShowData[]>([]);
  const [error, setError] = useState('');

  const location = useLocation();
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;


  const fetchShow = async () => {
    try {
      const showResults: ShowData[] = await Promise.all(
        Top100TvShowsList.map(async (show) => {
          const res = await Axios.get(`http://www.omdbapi.com/?i=${show.imdbID}&apikey=${apiKey}`);
          return res.data;
        })
      );
      setGeneratedTVShow(showResults);
    } catch (err) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchShow();
  }, []);

  return (
    <div className="home">
      <Navbar currentPage={location.pathname} />
      <div className="container">
        <div className="box">
          <Ranking media={generatedTVShow} type="shows" />
        </div>
      </div>
    </div>
  );
}

export default Top100Movies;
