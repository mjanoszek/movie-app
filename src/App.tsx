import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import Home from './pages/Home';
import Top100Movies from './pages/Top100Movies';
import Top100TVShows from './pages/Top100TVShows';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Top100Movies" element={<Top100Movies />} />
        <Route path="/Top100TVShows" element={<Top100TVShows />} />
        <Route path="/Watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
