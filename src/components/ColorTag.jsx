import React from 'react';
import styles from './ColorTag.module.css';

/**
 * Color Tag
 * - 기본 variant 기반 스타일(orange/blue/gray)
 * - region용으로 bg/text 색상을 직접 넘길 수도 있다.
 */
export function ColorTag({ variant = 'orange', bg, text, children }) {
  const className = [
    styles.colorTag,
    variant === 'blue' ? styles.blue : variant === 'gray' ? styles.gray : styles.orange,
  ].join(' ');

  const style = {};
  if (bg) style.background = bg;
  if (text) style.color = text;

  return (
    <span className={className} style={Object.keys(style).length ? style : undefined}>
      {children}
    </span>
  );
}

export default ColorTag;
