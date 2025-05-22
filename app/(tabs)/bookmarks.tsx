import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useBookmarks } from '@/hooks/useBookmarks';
import NovelCard from '@/components/NovelCard';
import { Link } from 'expo-router';
import HeaderBar from '@/components/HeaderBar';
import EmptyState from '@/components/EmptyState';

export default function BookmarksScreen() {
  const { colors } = useTheme();
  const { bookmarks, removeBookmark } = useBookmarks();

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
      <HeaderBar title="My Library" />
      
      {bookmarks.length === 0 ? (
        <EmptyState 
          title="No bookmarks yet"
          message="Novels you bookmark will appear here"
          icon="bookmark"
        />
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={({ item }) => (
            <Link href={`/novel/${item.id}`} asChild>
              <NovelCard 
                novel={item} 
                showRemoveButton 
                onRemove={() => removeBookmark(item.id)}
              />
            </Link>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      )}
    </View>
  );
}