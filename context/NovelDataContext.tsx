import React, { createContext, useContext, useState } from 'react';
import { Novel } from '@/types';
import { fetchLatestNovels as fetchLatest, fetchPopularNovels as fetchPopular } from '@/services/api';

type NovelDataContextType = {
  latestNovels: Novel[];
  popularNovels: Novel[];
  isLoading: boolean;
  error: string | null;
  fetchLatestNovels: () => Promise<void>;
  fetchPopularNovels: () => Promise<void>;
};

const NovelDataContext = createContext<NovelDataContextType | undefined>(undefined);

export const NovelDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latestNovels, setLatestNovels] = useState<Novel[]>([]);
  const [popularNovels, setPopularNovels] = useState<Novel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestNovels = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const novels = await fetchLatest();
      setLatestNovels(novels);
    } catch (err) {
      setError('Failed to fetch latest novels. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPopularNovels = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const novels = await fetchPopular();
      setPopularNovels(novels);
    } catch (err) {
      setError('Failed to fetch popular novels. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NovelDataContext.Provider
      value={{
        latestNovels,
        popularNovels,
        isLoading,
        error,
        fetchLatestNovels,
        fetchPopularNovels,
      }}
    >
      {children}
    </NovelDataContext.Provider>
  );
};

export const useNovelData = (): NovelDataContextType => {
  const context = useContext(NovelDataContext);
  if (context === undefined) {
    throw new Error('useNovelData must be used within a NovelDataProvider');
  }
  return context;
};