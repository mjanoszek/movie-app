import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFilm, faTv, faStar } from '@fortawesome/free-solid-svg-icons';

interface HamburgerItem {
  id: number;
  title: string;
  path: string;
  icon: JSX.Element;
}

export const HamburgerData: HamburgerItem[] = [
  {
    id: 1,
    title: 'Home',
    path: '/',
    icon: <FontAwesomeIcon icon={faHouse} />
  },
  {
    id: 2,
    title: 'Top 100 Movies',
    path: '/Top100Movies',
    icon: <FontAwesomeIcon icon={faFilm} />
  },
  {
    id: 3,
    title: 'Top 100 TV Shows',
    path: '/Top100TVShows',
    icon: <FontAwesomeIcon icon={faTv} />
  },
  {
    id: 4,
    title: 'Watchlist',
    path: '/Watchlist',
    icon: <FontAwesomeIcon icon={faStar} />
  }
];

export default HamburgerData;
