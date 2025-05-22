import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { HistoryItem as HistoryItemType } from '@/types';
import { formatDistanceToNow } from '@/utils/date';

interface HistoryItemProps {
  historyItem: HistoryItemType;
}

export default function HistoryItem({ historyItem }: HistoryItemProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    coverImage: {
      width: 60,
      height: 90,
      borderRadius: 4,
      marginRight: 16,
    },
    infoContainer: {
      flex: 1,
    },
    novelTitle: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },
    chapterTitle: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 14,
      color: colors.text + '80',
      marginBottom: 8,
    },
    timestamp: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 12,
      color: colors.text + '60',
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <Image 
        source={{ uri: historyItem.coverImage }} 
        style={styles.coverImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.novelTitle} numberOfLines={1}>{historyItem.novelTitle}</Text>
        <Text style={styles.chapterTitle} numberOfLines={2}>{historyItem.chapterTitle}</Text>
        <Text style={styles.timestamp}>
          {formatDistanceToNow(new Date(historyItem.timestamp))}
        </Text>
      </View>
    </TouchableOpacity>
  );
}