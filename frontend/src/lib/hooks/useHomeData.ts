"use client";
import { useState, useEffect } from 'react';
import { fetchHomepage, type HomepageData } from '@/shared/services/api';

interface UseHomeDataResult {
  data: HomepageData | null;
  loading: boolean;
  error: string | null;
}

export const useHomeData = (initialData?: HomepageData | null): UseHomeDataResult => {
  const [data, setData] = useState<HomepageData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return;
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchHomepage();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [initialData]);

  return { data, loading, error };
};
