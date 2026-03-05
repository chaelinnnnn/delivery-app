import React from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { NoticeBar } from './NoticeBar';
import { DeliveryCard } from './DeliveryCard';
import { useDeliveries } from '../hooks/useDeliveries';
import styles from './HomePage.module.css';

/**
 * 플레이팅 사내 앱 - Home 화면 (Figma node 62-5307)
 * 배달 데이터: Google Sheets API (Sheet1!A:J)
 */
export function HomePage() {
  const { teams, loading, error } = useDeliveries();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate(),
  ).padStart(2, '0')}`;

  const todaysTeams = teams.filter((team) => team.date === todayStr);
  const hasTeams = todaysTeams.length > 0;

  return (
    <div className={styles.page}>
      <TopNav title="Home" />

      <main className={styles.main}>
        <div className={styles.noticeBar}>
          <NoticeBar title="Public Notice of Proposed Amendment" />
        </div>
        <h2 className={styles.heading}>My delivery</h2>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        )}
        {error && !loading && (
          <p className={styles.error}>시트를 불러올 수 없습니다.</p>
        )}

        {!loading && !error && hasTeams && (
          <>
            {todaysTeams.map((team, index) => (
              <section
                key={team.vehicle_id || team.teamId || team.team_leader || team.teamName || index}
                className={styles.teamGroup}
                aria-label={team.team_leader || team.teamName}
              >
                <DeliveryCard
                  teamId={team.teamId}
                  teamName={team.teamName}
                  slots={team.slots || []}
                  regionTag={team.regionTag}
                />
              </section>
            ))}
          </>
        )}

        <div className={styles.spacer} />
      </main>

      <BottomNav />
    </div>
  );
}

export default HomePage;
