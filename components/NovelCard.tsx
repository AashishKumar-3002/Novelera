import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Novel } from '@/types';
import { X } from 'lucide-react-native';

interface NovelCardProps {
  novel: Novel;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

export default function NovelCard({ 
  novel,
  showRemoveButton = false,
  onRemove 
}: NovelCardProps) {
  const { colors } = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 48) / 2;

  const styles = StyleSheet.create({
    cardContainer: {
      width: cardWidth,
      marginBottom: 16,
    },
    card: {
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: colors.card,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    coverContainer: {
      position: 'relative',
      height: cardWidth * 1.5,
    },
    coverImage: {
      width: '100%',
      height: '100%',
    },
    removeButton: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: colors.card + 'CC',
      borderRadius: 16,
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    statusBadge: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: colors.primary + 'CC',
      borderRadius: 4,
    },
    statusText: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 10,
      color: '#FFFFFF',
    },
    infoContainer: {
      padding: 8,
    },
    title: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 14,
      color: colors.text,
      marginBottom: 4,
    },
    author: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 12,
      color: colors.text + '80',
    },
  });

  const handleRemove = (e: any) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.coverContainer}>
          <Image 
            source={{ uri: novel.coverImage }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          
          {showRemoveButton && (
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={handleRemove}
            >
              <X size={16} color={colors.text} />
            </TouchableOpacity>
          )}
          
          {novel.status && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{novel.status.toUpperCase()}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>{novel.title}</Text>
          <Text style={styles.author} numberOfLines={1}>{novel.author}</Text>
        </View>
      </View>
    </View>
  );
}