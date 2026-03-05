import React from 'react';
import { DeliverySlotCard } from './DeliverySlotCard';
import { ColorTag } from './ColorTag';
import styles from './DeliveryCard.module.css';

/**
 * 배송 카드 (팀 ID, 팀명, 슬롯 목록, 지역 뱃지 1개)
 * Figma: Group 1000011672 + 슬롯들
 */
export function DeliveryCard({
  teamId,
  teamName,
  slots = [],
  regionTag, // { label, variant: 'orange'|'blue' } - 팀당 하나만
}) {
  return (
    <div className={styles.card}>
      {regionTag && (
        <div className={styles.regionTags}>
          <ColorTag
            variant={regionTag.variant}
            bg={regionTag.bg}
            text={regionTag.text}
          >
            {regionTag.label}
          </ColorTag>
        </div>
      )}
      <div className={styles.header}>
        <h3 className={styles.teamName}>{teamName}</h3>
        <span className={styles.teamId}>
          <CarIcon className={styles.carIcon} />
          {teamId}
        </span>
      </div>
      <div className={styles.slots}>
        {slots.map((slot, i) => (
          <DeliverySlotCard
            key={i}
            time={slot.time}
            location={slot.location}
            tags={slot.tags}
            stageLabel={slot.stageLabel}
            status={slot.status}
            statusText={slot.statusText}
            dimmed={slot.dimmed}
          />
        ))}
      </div>
    </div>
  );
}

/** Figma icon_car (node 62-5221) - 인라인 SVG */
function CarIcon({ className }) {
  const id = 'car-icon';
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18.0524 8.24931L17.1713 7.25448V7.21572L17.0611 6.97024L15.7884 3.53355C15.5559 2.9134 15.0297 2.51288 14.4422 2.51288H5.55762C4.97021 2.51288 4.43175 2.9134 4.21147 3.53355L2.93874 6.97024L2.84084 7.21572V7.25448H2.8286L1.94748 8.24931C1.76392 8.45603 1.66602 8.74027 1.66602 9.03743V9.91598V12.009C1.66602 12.5387 1.71497 13.0684 1.81287 13.5852L1.86182 13.8436H18.138L18.187 13.5852C18.2849 13.0684 18.3338 12.5387 18.3338 12.009V9.91598V9.03743C18.3338 8.74027 18.2359 8.45603 18.0524 8.24931ZM15.9842 6.8798H4.01567C3.80762 6.8798 3.67301 6.64725 3.7342 6.44053L4.46846 4.02451C4.63979 3.44311 5.1293 3.05551 5.66776 3.05551H14.3199C14.8583 3.05551 15.3478 3.44311 15.5192 4.02451L16.2534 6.44053C16.3146 6.66017 16.18 6.8798 15.972 6.8798H15.9842Z" fill={`url(#${id}_paint0)`} />
      <path d="M18.3584 15.3168H1.64161C1.42133 15.3168 1.25 15.136 1.25 14.9034V14.2445C1.25 14.0249 1.43357 13.8311 1.64161 13.8311H18.3462C18.5664 13.8311 18.7378 14.0119 18.7378 14.2445V14.9034C18.7378 15.123 18.5542 15.3168 18.3462 15.3168H18.3584Z" fill="#C7CFD4" />
      <path d="M16.2655 6.44068L15.5313 4.02466C15.3477 3.44326 14.8704 3.05566 14.332 3.05566H7.98056H5.67986C5.1414 3.05566 4.65189 3.44326 4.48056 4.02466L3.74629 6.44068C3.6851 6.66031 3.81972 6.87995 4.02776 6.87995H15.9963C16.1921 6.87995 16.3389 6.64739 16.2778 6.44068H16.2655Z" fill={`url(#${id}_paint1)`} />
      <path d="M4.16221 17.4999H2.60801C2.37549 17.4999 2.17969 17.2802 2.17969 17.0089V15.3164H4.60276V17.0089C4.60276 17.2802 4.40696 17.4999 4.17444 17.4999H4.16221Z" fill="#313D4C" />
      <path d="M15.8497 17.5H17.4039C17.6365 17.5 17.8323 17.2804 17.8323 17.009V15.3165H15.4092V17.009C15.4092 17.2804 15.605 17.5 15.8375 17.5H15.8497Z" fill="#313D4C" />
      <path d="M6.25 11V11.875C6.25 12.1511 6.02614 12.375 5.75 12.375H3.08211C2.63665 12.375 2.41357 11.8364 2.72855 11.5214L3.60355 10.6464C3.69732 10.5527 3.8245 10.5 3.95711 10.5H5.75C6.02614 10.5 6.25 10.7239 6.25 11Z" fill="white" />
      <path d="M13.75 11V11.875C13.75 12.1511 13.9739 12.375 14.25 12.375H16.9179C17.3633 12.375 17.5864 11.8364 17.2714 11.5214L16.3964 10.6464C16.3027 10.5527 16.1755 10.5 16.0429 10.5H14.25C13.9739 10.5 13.75 10.7239 13.75 11Z" fill="white" />
      <defs>
        <linearGradient id={`${id}_paint0`} x1="9.99993" y1="2.51288" x2="9.99993" y2="13.8436" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9E1E7" />
          <stop offset="0.796875" stopColor="#C1C8CE" />
          <stop offset="1" stopColor="#A7AEB4" />
        </linearGradient>
        <linearGradient id={`${id}_paint1`} x1="10.0116" y1="3.05566" x2="10.0116" y2="6.87995" gradientUnits="userSpaceOnUse">
          <stop stopColor="#55687E" />
          <stop offset="1" stopColor="#171E26" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default DeliveryCard;
