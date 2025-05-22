import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import HeaderBar from '@/components/HeaderBar';
import { ChevronRight, Moon, Sun, Type, Clock } from 'lucide-react-native';
import { useFontSettings } from '@/hooks/useFontSettings';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { 
    fontSize, 
    lineHeight, 
    fontFamily,
    increaseFontSize, 
    decreaseFontSize,
    increaseLineHeight,
    decreaseLineHeight,
    toggleFontFamily
  } = useFontSettings();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    section: {
      marginBottom: 24,
      padding: 16,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
    },
    sectionTitle: {
      fontFamily: 'NunitoSans-Bold',
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    rowLabel: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
    },
    rowValue: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 16,
      color: theme.colors.text + '80',
      marginRight: 8,
    },
    contentContainer: {
      padding: 16,
    },
    iconContainer: {
      marginRight: 12,
      width: 24,
      alignItems: 'center',
    },
    controlsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    controlButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    controlValue: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 16,
      color: theme.colors.text,
      marginHorizontal: 8,
      minWidth: 40,
      textAlign: 'center',
    },
    aboutText: {
      fontFamily: 'NunitoSans-Regular',
      fontSize: 14,
      color: theme.colors.text + '80',
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 40,
    },
  });

  return (
    <View style={styles.container}>
      <HeaderBar title="Settings" />
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              {isDark ? <Moon size={20} color={theme.colors.text} /> : <Sun size={20} color={theme.colors.text} />}
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Type size={20} color={theme.colors.text} />
            </View>
            <Text style={styles.rowLabel}>Font Size</Text>
            <View style={styles.controlsContainer}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={decreaseFontSize}
              >
                <Text style={styles.rowLabel}>-</Text>
              </TouchableOpacity>
              <Text style={styles.controlValue}>{fontSize}</Text>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={increaseFontSize}
              >
                <Text style={styles.rowLabel}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Type size={20} color={theme.colors.text} />
            </View>
            <Text style={styles.rowLabel}>Line Height</Text>
            <View style={styles.controlsContainer}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={decreaseLineHeight}
              >
                <Text style={styles.rowLabel}>-</Text>
              </TouchableOpacity>
              <Text style={styles.controlValue}>{lineHeight.toFixed(1)}</Text>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={increaseLineHeight}
              >
                <Text style={styles.rowLabel}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={[styles.row, styles.lastRow]}>
            <View style={styles.iconContainer}>
              <Type size={20} color={theme.colors.text} />
            </View>
            <Text style={styles.rowLabel}>Font Family</Text>
            <TouchableOpacity 
              style={styles.controlsContainer}
              onPress={toggleFontFamily}
            >
              <Text style={styles.rowValue}>{fontFamily === 'serif' ? 'Serif' : 'Sans-serif'}</Text>
              <ChevronRight size={20} color={theme.colors.text + '80'} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading</Text>
          
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Clock size={20} color={theme.colors.text} />
            </View>
            <Text style={styles.rowLabel}>Keep Screen Awake</Text>
            <Switch
              value={true}
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>
        
        <Text style={styles.aboutText}>
          Light Novel Reader v1.0.0{'\n'}
          This app is for educational purposes only.{'\n'}
          Content is sourced from lightnovelpub.me
        </Text>
      </ScrollView>
    </View>
  );
}