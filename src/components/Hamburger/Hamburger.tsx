import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Hamburger.module.scss';
import HamburgerItems from '../HamburgerItems';

interface HamburgerProps {
  currentPage?: string;
}

function Hamburger({ currentPage = '' }: HamburgerProps) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className={styles.navbar__sidebar}>
        <FontAwesomeIcon icon={faBars} style={{ color: '#FFFFFF' }} onClick={showSidebar} />
      </div>
      <nav className={sidebar ? `${styles.nav__menu} ${styles.active}` : styles.nav__menu}>
        <ul className={styles.nav__menu_items}>
          <div className={styles.navbar__sidebar_close}>
            <button type="button" onClick={showSidebar} className={styles.navbar_toggle}>
              <Link to={currentPage} className={styles.menu__bars}>
                <FontAwesomeIcon icon={faXmark} />
              </Link>
            </button>
          </div>
          <HamburgerItems />
        </ul>
      </nav>
    </>
  );
}

Hamburger.defaultProps = {
  currentPage: ''
};

export default Hamburger;
