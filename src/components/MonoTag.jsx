import React from 'react';
import styles from './MonoTag.module.css';

/**
 * Mono Tag (Figma: Tag/S/gray) - 회색 라벨
 */
export function MonoTag({ children }) {
  return <span className={styles.monoTag}>{children}</span>;
}

export default MonoTag;
