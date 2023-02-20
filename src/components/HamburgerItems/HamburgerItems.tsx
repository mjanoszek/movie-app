import React from 'react';
import { Link } from 'react-router-dom';
import { HamburgerData } from '../../Data/HamburgerData';
import styles from './HamburgerItems.module.scss';

function HamburgerItems() {
  return (
    <div className={styles.nav__menu_list}>
      {HamburgerData.map((item) => (
        <Link key={item.id} to={item.path}>
          <li key={item.id} className={styles.nav__menu_item}>
            {item.icon}
            <span>{item.title}</span>
          </li>
        </Link>
      ))}
    </div>
  );
}

export default HamburgerItems;
