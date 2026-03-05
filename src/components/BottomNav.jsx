import React from 'react';
import { IconHome, IconTruck, IconCustomer, IconClean, IconBoard } from './BottomNavIcons';
import styles from './BottomNav.module.css';

const ITEMS = [
  { id: 'home', label: 'Home', Icon: IconHome, active: true },
  { id: 'delivery', label: 'Delivery', Icon: IconTruck, active: false },
  { id: 'customer', label: 'Customer', Icon: IconCustomer, active: false },
  { id: 'hygiene', label: 'Hygiene', Icon: IconClean, active: false },
  { id: 'notice', label: 'Notice', Icon: IconBoard, active: false },
];

/**
 * 하단 네비게이션 (Figma: Bottom Navigation, type=Home - node 62-5165)
 */
export function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.navItem} ${item.active ? styles.active : ''}`}
          aria-current={item.active ? 'page' : undefined}
        >
          <span className={styles.icon}>
            <item.Icon active={item.active} />
          </span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
