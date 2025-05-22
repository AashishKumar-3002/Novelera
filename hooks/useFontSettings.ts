import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FontSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: 'serif' | 'sans-serif';
}

const DEFAULT_FONT_SETTINGS: FontSettings = {
  fontSize: 16,
  lineHeight: 1.5,
  fontFamily: 'serif',
};

export function useFontSettings() {
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SETTINGS.fontSize);
  const [lineHeight, setLineHeight] = useState<number>(DEFAULT_FONT_SETTINGS.lineHeight);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans-serif'>(DEFAULT_FONT_SETTINGS.fontFamily);

  useEffect(() => {
    loadFontSettings();
  }, []);

  const loadFontSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('@font_settings');
      if (storedSettings) {
        const settings: FontSettings = JSON.parse(storedSettings);
        setFontSize(settings.fontSize);
        setLineHeight(settings.lineHeight);
        setFontFamily(settings.fontFamily);
      }
    } catch (error) {
      console.error('Failed to load font settings', error);
    }
  };

  const saveFontSettings = async () => {
    try {
      const settings: FontSettings = {
        fontSize,
        lineHeight,
        fontFamily,
      };
      await AsyncStorage.setItem('@font_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save font settings', error);
    }
  };

  useEffect(() => {
    saveFontSettings();
  }, [fontSize, lineHeight, fontFamily]);

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(prev => prev + 1);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(prev => prev - 1);
    }
  };

  const increaseLineHeight = () => {
    if (lineHeight < 2.0) {
      setLineHeight(prev => parseFloat((prev + 0.1).toFixed(1)));
    }
  };

  const decreaseLineHeight = () => {
    if (lineHeight > 1.0) {
      setLineHeight(prev => parseFloat((prev - 0.1).toFixed(1)));
    }
  };

  const toggleFontFamily = () => {
    setFontFamily(prev => prev === 'serif' ? 'sans-serif' : 'serif');
  };

  return {
    fontSize,
    lineHeight,
    fontFamily,
    increaseFontSize,
    decreaseFontSize,
    increaseLineHeight,
    decreaseLineHeight,
    toggleFontFamily,
  };
}