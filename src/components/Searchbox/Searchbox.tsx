import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Searchbox.module.scss';

interface SearchboxProps {
  setSearchMovie: React.Dispatch<React.SetStateAction<string>>;
}

function Searchbox({ setSearchMovie }: SearchboxProps) {
  return (
    <div className={styles.navbar__search}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        type="text"
        onChange={(e) => setSearchMovie(e.target.value === '' ? '' : e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}
export default Searchbox;
