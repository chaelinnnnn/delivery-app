import { useState, useEffect } from 'react';

// 배포된 API 서버 주소
const API_URL = 'https://delivery-app-production-242a.up.railway.app/api/deliveries';

const REGION_COLORS = {
  Manhattan: { bg: '#EDF2FF', text: '#81A3FF' },
  Brooklyn: { bg: '#FFF6F0', text: '#FF6100' },
  Queens: { bg: '#3E3E3E', text: '#FFFFFF' },
};

const DEFAULT_REGION_COLORS = { bg: '#F5F5F5', text: '#3E3E3E' };

function mapApiToTeams(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item, index) => {
    const teamName = item.team_leader || `Team ${index + 1}`;
    const teamId = item.vehicle_id || '';
    const date = item.date || '';
    const regionLabel = item.region || '';

    const slots = Array.isArray(item.deliveries)
      ? item.deliveries.map((d) => {
          const statusText = d.status || 'In Transit';
          const statusKey = (() => {
            const t = statusText.toLowerCase();
            if (t.includes('deliver')) return 'delivered';
            if (t.includes('prepar')) return 'preparing';
            if (t.includes('transit')) return 'in-transit';
            return 'in-transit';
          })();

          return {
            time: d.time || '',
            location: d.location || '',
            tags: Array.isArray(d.categories) ? d.categories : [],
            stageLabel: d.action || 'Setup',
            status: statusKey,
            statusText,
            dimmed: d.confirmed === false,
          };
        })
      : [];

    const regionColors =
      regionLabel && REGION_COLORS[regionLabel]
        ? REGION_COLORS[regionLabel]
        : regionLabel
        ? DEFAULT_REGION_COLORS
        : null;

    return {
      date,
      teamName,
      teamId,
      regionTag:
        regionLabel && regionColors
          ? {
              label: regionLabel,
              bg: regionColors.bg,
              text: regionColors.text,
              variant:
                regionLabel in REGION_COLORS ? undefined : 'gray', // for CSS fallback
            }
          : undefined,
      slots,
    };
  });
}

export function useDeliveries() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText || 'Failed to load');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          const mapped = mapApiToTeams(data);
          setTeams(mapped);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Unknown error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { teams, loading, error };
}
