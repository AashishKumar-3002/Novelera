import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import HeaderBar from '@/components/HeaderBar';
import HistoryItem from '@/components/HistoryItem';
import { Link } from 'expo-router';
import EmptyState from '@/components/EmptyState';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const { history, clearHistory } = useReadingHistory();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContainer: {
      padding: 16,
    },
  });

  return (
    <View style={styles.container}>
      <HeaderBar 
        title="Reading History" 
        rightButtonIcon="trash" 
        onRightButtonPress={clearHistory}
        rightButtonDisabled={history.length === 0}
      />
      
      {history.length === 0 ? (
        <EmptyState 
          title="No reading history"
          message="Novels you've read will appear here"
          icon="history"
        />
      ) : (
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <Link href={`/chapter/${item.novelId}/${item.chapterId}`} asChild>
              <HistoryItem historyItem={item} />
            </Link>
          )}
          keyExtractor={(item) => `${item.novelId}-${item.chapterId}`}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}