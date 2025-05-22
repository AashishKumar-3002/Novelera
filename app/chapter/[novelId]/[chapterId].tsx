import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { fetchChapterContent } from '@/services/api';
import { Chapter, Novel } from '@/types';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ArrowRight, Settings } from 'lucide-react-native';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { useFontSettings } from '@/hooks/useFontSettings';
import ErrorDisplay from '@/components/ErrorDisplay';
import ReadingSettingsModal from '@/components/ReadingSettingsModal';

export default function ChapterScreen() {
  const { novelId, chapterId } = useLocalSearchParams<{ novelId: string, chapterId: string }>();
  const router = useRouter();
  const { theme, colors } = useTheme();
  const { fontSize, lineHeight, fontFamily } = useFontSettings();
  
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [novel, setNovel] = useState<Novel | null>(null);
  const [nextChapterId, setNextChapterId] = useState<string | null>(null);
  const [prevChapterId, setPrevChapterId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const { addToHistory } = useReadingHistory();
  const scrollViewRef = useRef<ScrollView>(null);
  
  useEffect(() => {
    if (!novelId || !chapterId) return;
    
    const loadChapterContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { chapterContent, novelInfo, prevChapter, nextChapter } = await fetchChapterContent(novelId, chapterId);
        setChapter(chapterContent);
        setNovel(novelInfo);
        setPrevChapterId(prevChapter);
        setNextChapterId(nextChapter);
        
        // Add to reading history
        if (chapterContent && novelInfo) {
          addToHistory({
            novelId,
            chapterId,
            novelTitle: novelInfo.title,
            chapterTitle: chapterContent.title,
            coverImage: novelInfo.coverImage,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (err) {
        setError('Failed to load chapter content. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChapterContent();
  }, [novelId, chapterId]);

  const navigateToChapter = (targetChapterId: string | null) => {
    if (!targetChapterId) return;
    router.replace(`/chapter/${novelId}/${targetChapterId}`);
  };

  const fontStyles = {
    fontSize: fontSize,
    lineHeight: fontSize * lineHeight,
    fontFamily: fontFamily === 'serif' ? 'Merriweather-Regular' : 'NunitoSans-Regular',
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
    headerButton: {
      padding: 8,
    },
    titleContainer: {
      paddingHorizontal: 24,
      paddingVertical: 20,
      alignItems: 'center',
    },
    novelTitle: {
      fontFamily: 'NunitoSans-Bold',
      fontSize: 16,
      color: colors.text + '80',
      marginBottom: 4,
    },
    chapterTitle: {
      fontFamily: 'Merriweather-Bold',
      fontSize: 20,
      color: colors.text,
      textAlign: 'center',
    },
    contentContainer: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    paragraph: {
      marginBottom: 20,
      ...fontStyles,
      color: colors.text,
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    navigationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.card,
    },
    navigationButtonDisabled: {
      opacity: 0.5,
    },
    navigationButtonText: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginHorizontal: 8,
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

  if (error || !chapter || !novel) {
    return (
      <ErrorDisplay 
        message={error || 'Failed to load chapter content'} 
        onRetry={() => router.replace(`/chapter/${novelId}/${chapterId}`)} 
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={() => setShowSettings(true)}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.novelTitle}>{novel.title}</Text>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
        </View>
        
        <View style={styles.contentContainer}>
          {chapter.content.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[
            styles.navigationButton,
            !prevChapterId && styles.navigationButtonDisabled
          ]}
          onPress={() => navigateToChapter(prevChapterId)}
          disabled={!prevChapterId}
        >
          <ArrowLeft size={20} color={colors.text} />
          <Text style={styles.navigationButtonText}>Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.navigationButton,
            !nextChapterId && styles.navigationButtonDisabled
          ]}
          onPress={() => navigateToChapter(nextChapterId)}
          disabled={!nextChapterId}
        >
          <Text style={styles.navigationButtonText}>Next</Text>
          <ArrowRight size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ReadingSettingsModal 
        visible={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </View>
  );
}