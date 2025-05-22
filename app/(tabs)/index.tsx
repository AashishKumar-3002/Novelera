import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNovelData } from '@/context/NovelDataContext';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import SearchBar from '@/components/SearchBar';
import NovelCard from '@/components/NovelCard';
import { Link } from 'expo-router';
import ErrorDisplay from '@/components/ErrorDisplay';
import HeaderBar from '@/components/HeaderBar';

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const { latestNovels, popularNovels, fetchLatestNovels, fetchPopularNovels, isLoading, error } = useNovelData();
  const [refreshing, setRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('latest');

  useEffect(() => {
    fetchLatestNovels();
    fetchPopularNovels();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    if (activeSection === 'latest') {
      await fetchLatestNovels();
    } else {
      await fetchPopularNovels();
    }
    setRefreshing(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sectionHeader: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginVertical: 16,
    },
    sectionButton: {
      marginRight: 16,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    activeSectionButton: {
      backgroundColor: colors.primary,
    },
    sectionButtonText: {
      fontSize: 16,
      fontFamily: 'NunitoSans-SemiBold',
      color: colors.text,
    },
    activeSectionButtonText: {
      color: '#FFFFFF',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      padding: 16,
    },
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={onRefresh} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeaderBar title="Discover" />
      <SearchBar placeholder="Search for novels..." />
      
      <View style={styles.sectionHeader}>
        <View 
          style={[
            styles.sectionButton, 
            activeSection === 'latest' && styles.activeSectionButton
          ]}
        >
          <Text 
            style={[
              styles.sectionButtonText, 
              activeSection === 'latest' && styles.activeSectionButtonText
            ]}
            onPress={() => setActiveSection('latest')}
          >
            Latest
          </Text>
        </View>
        <View 
          style={[
            styles.sectionButton, 
            activeSection === 'popular' && styles.activeSectionButton
          ]}
        >
          <Text 
            style={[
              styles.sectionButtonText, 
              activeSection === 'popular' && styles.activeSectionButtonText
            ]}
            onPress={() => setActiveSection('popular')}
          >
            Popular
          </Text>
        </View>
      </View>

      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={activeSection === 'latest' ? latestNovels : popularNovels}
          renderItem={({ item }) => (
            <Link href={`/novel/${item.id}`} asChild>
              <NovelCard novel={item} />
            </Link>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </View>
  );
}