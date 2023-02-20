import React from 'react';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import Posters from '../components/Posters';

function Watchlist() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const location = useLocation();

  return (
    <div className="home">
      <Navbar currentPage={location.pathname} />
      <div className="container">
        <div className="box">
          <Posters posters={favorites} isWatchList />
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
