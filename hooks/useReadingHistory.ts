import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryItem } from '@/types';

export function useReadingHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('@reading_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load reading history', error);
    }
  };

  const saveHistory = async (updatedHistory: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem('@reading_history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to save reading history', error);
    }
  };

  const addToHistory = async (historyItem: HistoryItem) => {
    // Remove any existing entries for the same chapter
    const filteredHistory = history.filter(
      item => !(item.novelId === historyItem.novelId && item.chapterId === historyItem.chapterId)
    );
    
    // Add new item at the beginning (most recent)
    const updatedHistory = [historyItem, ...filteredHistory];
    
    // Limit history to last 50 items
    const trimmedHistory = updatedHistory.slice(0, 50);
    
    await saveHistory(trimmedHistory);
  };

  const clearHistory = async () => {
    await saveHistory([]);
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
}