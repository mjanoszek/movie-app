import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';
import Searchbox from '../Searchbox/Searchbox';
import Hamburger from '../Hamburger/Hamburger';

interface SearchboxProps {
  withSearchBar?: boolean;
  setSearchMovie?: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
}

function Navbar({
  withSearchBar = false,
  setSearchMovie = () => {},
  currentPage = '',
}: SearchboxProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const location = useLocation();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__left}>
        <Link to="/">
          <h1>Flicky</h1>
        </Link>
        {withSearchBar && <Searchbox setSearchMovie={setSearchMovie} />}
      </div>

      <div className={styles.navbar__right}>
        {isMobile && <Hamburger currentPage={currentPage} />}
        <div className={styles.navbar__right__menu}>
          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
            <p>Home</p>
          </Link>
          <Link
            to="/Top100Movies"
            className={location.pathname === '/Top100Movies' ? styles.active : ''}
          >
            <p>Top 100 Movies</p>
          </Link>
          <Link
            to="/Top100TVShows"
            className={location.pathname === '/Top100TVShows' ? styles.active : ''}
          >
            <p>Top 100 TV Shows</p>
          </Link>
          <Link to="/Watchlist" className={location.pathname === '/Watchlist' ? styles.active : ''}>
            <p>Watchlist</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  withSearchBar: false,
  setSearchMovie: () => {},
};

export default Navbar;
