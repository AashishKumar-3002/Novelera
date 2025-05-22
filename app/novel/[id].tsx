import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { fetchNovelDetails } from '@/services/api';
import { Novel, Chapter } from '@/types';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { useBookmarks } from '@/hooks/useBookmarks';
import ErrorDisplay from '@/components/ErrorDisplay';

export default function NovelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const bookmarked = novel ? isBookmarked(novel.id) : false;

  useEffect(() => {
    if (!id) return;
    
    const loadNovelDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { novelDetails, novelChapters } = await fetchNovelDetails(id);
        setNovel(novelDetails);
        setChapters(novelChapters);
      } catch (err) {
        setError('Failed to load novel details. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNovelDetails();
  }, [id]);

  const handleBookmarkToggle = () => {
    if (novel) {
      toggleBookmark(novel);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 16,
      backgroundColor: colors.card,
    },
    backButton: {
      padding: 8,
    },
    headerRight: {
      width: 40,
      alignItems: 'center',
    },
    coverContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 24,
    },
    coverImage: {
      width: 160,
      height: 240,
      borderRadius: 8,
    },
    titleContainer: {
      paddingHorizontal: 24,
      marginBottom: 16,
    },
    title: {
      fontFamily: 'Merriweather-Bold',
      fontSize: 24,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    author: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 16,
      color: colors.text + '80',
      textAlign: 'center',
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 24,
      paddingVertical: 16,
      marginBottom: 24,
      backgroundColor: colors.card,
    },
    detailItem: {
      alignItems: 'center',
    },
    detailValue: {
      fontFamily: 'NunitoSans-Bold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },
    detailLabel: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 14,
      color: colors.text + '80',
    },
    sectionTitle: {
      fontFamily: 'NunitoSans-Bold',
      fontSize: 20,
      color: colors.text,
      marginBottom: 12,
      paddingHorizontal: 24,
    },
    synopsis: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    chaptersContainer: {
      paddingHorizontal: 24,
      marginBottom: 40,
    },
    chapterItem: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    chapterTitle: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 16,
      color: colors.text,
    },
    chapterDate: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 14,
      color: colors.text + '80',
      marginTop: 4,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !novel) {
    return (
      <ErrorDisplay 
        message={error || 'Failed to load novel details'} 
        onRetry={() => router.replace(`/novel/${id}`)} 
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerRight} onPress={handleBookmarkToggle}>
          {bookmarked ? (
            <BookmarkCheck size={24} color={colors.primary} />
          ) : (
            <Bookmark size={24} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        <View style={styles.coverContainer}>
          <Image 
            source={{ uri: novel.coverImage }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{novel.title}</Text>
          <Text style={styles.author}>{novel.author}</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{novel.status}</Text>
            <Text style={styles.detailLabel}>Status</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{chapters.length}</Text>
            <Text style={styles.detailLabel}>Chapters</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{novel.rating || '4.5'}</Text>
            <Text style={styles.detailLabel}>Rating</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Synopsis</Text>
        <Text style={styles.synopsis}>{novel.synopsis}</Text>
        
        <Text style={styles.sectionTitle}>Chapters</Text>
        <View style={styles.chaptersContainer}>
          {chapters.map((chapter) => (
            <Link href={`/chapter/${novel.id}/${chapter.id}`} asChild key={chapter.id}>
              <TouchableOpacity style={styles.chapterItem}>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
                <Text style={styles.chapterDate}>{chapter.releaseDate}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}