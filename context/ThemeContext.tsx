import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    error: string;
  };
};

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#1A365D',
    secondary: '#2C7A7B',
    background: '#F7FAFC',
    card: '#FFFFFF',
    text: '#1A202C',
    border: '#E2E8F0',
    notification: '#C05621',
    error: '#E53E3E',
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#4299E1',
    secondary: '#38B2AC',
    background: '#1A202C',
    card: '#2D3748',
    text: '#E2E8F0',
    border: '#4A5568',
    notification: '#ED8936',
    error: '#F56565',
  },
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  colors: Theme['colors'];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(colorScheme === 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('@theme_preference');
        if (storedTheme !== null) {
          setIsDark(storedTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference', error);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('@theme_preference', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors: theme.colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};