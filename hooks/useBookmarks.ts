import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Novel } from '@/types';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Novel[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('@bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('Failed to load bookmarks', error);
    }
  };

  const saveBookmarks = async (updatedBookmarks: Novel[]) => {
    try {
      await AsyncStorage.setItem('@bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('Failed to save bookmarks', error);
    }
  };

  const addBookmark = async (novel: Novel) => {
    const updatedBookmarks = [...bookmarks, novel];
    await saveBookmarks(updatedBookmarks);
  };

  const removeBookmark = async (novelId: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== novelId);
    await saveBookmarks(updatedBookmarks);
  };

  const isBookmarked = (novelId: string): boolean => {
    return bookmarks.some(bookmark => bookmark.id === novelId);
  };

  const toggleBookmark = async (novel: Novel) => {
    if (isBookmarked(novel.id)) {
      await removeBookmark(novel.id);
    } else {
      await addBookmark(novel);
    }
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark
  };
}