import React from 'react';
import styles from './NoticeBar.module.css';

/**
 * 공지/제안 배너 (Public Notice of Proposed Amendment + 화살표)
 */
export function NoticeBar({ title, onClick }) {
  return (
    <button type="button" className={styles.bar} onClick={onClick}>
      <span className={styles.title}>{title}</span>
      <span className={styles.arrow} aria-hidden>
        <ArrowIcon />
      </span>
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3l5 5-5 5" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default NoticeBar;
