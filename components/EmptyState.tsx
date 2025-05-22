import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Bookmark, History } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: 'bookmark' | 'history';
}

export default function EmptyState({ title, message, icon }: EmptyStateProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    iconContainer: {
      marginBottom: 16,
      padding: 20,
      borderRadius: 50,
      backgroundColor: colors.card,
    },
    title: {
      fontFamily: 'NunitoSans-Bold',
      fontSize: 20,
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    message: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 16,
      color: colors.text + '80',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon === 'bookmark' ? (
          <Bookmark size={40} color={colors.text + '80'} />
        ) : (
          <History size={40} color={colors.text + '80'} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}