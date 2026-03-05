import React, { useEffect, useRef, useState } from 'react';
import { MonoTag } from './MonoTag';
import { StatusTag } from './StatusTag';
import styles from './DeliverySlotCard.module.css';

/**
 * 배송 슬롯 카드 (시간, 장소, 태그, 단계, 상태)
 * Figma: 886, 2, 3, 887, 888 프레임
 */
export function DeliverySlotCard({
  time,
  location,
  tags = [],
  stageLabel, // 'Setup' | 'Pickup'
  status, // 'in-transit' | 'preparing' | 'delivered'
  statusText,
  dimmed = false,
}) {
  const locationRef = useRef(null);
  const [isTwoLineLocation, setIsTwoLineLocation] = useState(false);

  useEffect(() => {
    const el = locationRef.current;
    if (!el) return;

    const styles = window.getComputedStyle(el);
    const lineHeight = parseFloat(styles.lineHeight) || 20;
    const height = el.getBoundingClientRect().height;

    // 한 줄 높이보다 충분히 크면 2줄 이상으로 판단
    setIsTwoLineLocation(height > lineHeight * 1.5);
  }, [location]);

  const isDelivered = status === 'delivered';

  return (
    <div
      className={`${styles.card} ${dimmed ? styles.dimmed : ''} ${
        isDelivered ? styles.delivered : ''
      }`}
    >
      <div className={`${styles.header} ${isTwoLineLocation ? styles.headerTwoLine : ''}`}>
        <span className={styles.time}>{time}</span>
        <span ref={locationRef} className={styles.location}>
          {location}
        </span>
        <span className={styles.statusWrap}>
          <StatusTag status={status}>{statusText}</StatusTag>
        </span>
      </div>
      <div
        className={`${styles.stage} ${
          isTwoLineLocation ? styles.stageTwoLine : ''
        }`}
      >
        {stageLabel}
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <MonoTag key={tag}>{tag}</MonoTag>
        ))}
      </div>
    </div>
  );
}

export default DeliverySlotCard;
