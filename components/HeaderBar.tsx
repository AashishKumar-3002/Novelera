import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Trash } from 'lucide-react-native';

interface HeaderBarProps {
  title: string;
  rightButtonIcon?: 'trash';
  onRightButtonPress?: () => void;
  rightButtonDisabled?: boolean;
}

export default function HeaderBar({
  title,
  rightButtonIcon,
  onRightButtonPress,
  rightButtonDisabled = false,
}: HeaderBarProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 16,
    },
    title: {
      fontFamily: 'Merriweather-Bold',
      fontSize: 24,
      color: colors.text,
    },
    rightButton: {
      padding: 8,
      opacity: rightButtonDisabled ? 0.5 : 1,
    },
    placeholder: {
      width: 40,
    },
  });

  const renderRightButton = () => {
    if (!rightButtonIcon) return <View style={styles.placeholder} />;

    return (
      <TouchableOpacity 
        style={styles.rightButton} 
        onPress={onRightButtonPress}
        disabled={rightButtonDisabled}
      >
        {rightButtonIcon === 'trash' && (
          <Trash size={24} color={colors.text} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {renderRightButton()}
    </View>
  );
}