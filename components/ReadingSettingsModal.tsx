import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useFontSettings } from '@/hooks/useFontSettings';
import { X, Moon, Sun, Type } from 'lucide-react-native';

interface ReadingSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ReadingSettingsModal({
  visible,
  onClose,
}: ReadingSettingsModalProps) {
  const { theme, isDark, toggleTheme, colors } = useTheme();
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
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontFamily: 'NunitoSans-Bold',
      fontSize: 18,
      color: colors.text,
    },
    closeButton: {
      padding: 8,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    settingLabel: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelText: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
    controlsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    controlButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    controlValue: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginHorizontal: 8,
      minWidth: 40,
      textAlign: 'center',
    },
    fontFamilyButton: {
      backgroundColor: colors.border,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    fontFamilyButtonActive: {
      backgroundColor: colors.primary,
    },
    fontFamilyText: {
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 14,
      color: colors.text,
    },
    fontFamilyTextActive: {
      color: '#FFFFFF',
    },
    fontSample: {
      marginTop: 20,
      marginBottom: 16,
      padding: 16,
      backgroundColor: colors.background,
      borderRadius: 8,
    },
    sampleText: {
      fontFamily: fontFamily === 'serif' ? 'Merriweather-Regular' : 'NunitoSans-Regular',
      fontSize: fontSize,
      lineHeight: fontSize * lineHeight,
      color: colors.text,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Reading Settings</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.settingRow}>
                <View style={styles.settingLabel}>
                  {isDark ? (
                    <Moon size={20} color={colors.text} />
                  ) : (
                    <Sun size={20} color={colors.text} />
                  )}
                  <Text style={styles.labelText}>Theme</Text>
                </View>
                <View style={styles.controlsContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.fontFamilyButton,
                      !isDark && styles.fontFamilyButtonActive
                    ]}
                    onPress={() => !isDark || toggleTheme()}
                  >
                    <Text 
                      style={[
                        styles.fontFamilyText,
                        !isDark && styles.fontFamilyTextActive
                      ]}
                    >
                      Light
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: 8 }} />
                  <TouchableOpacity 
                    style={[
                      styles.fontFamilyButton,
                      isDark && styles.fontFamilyButtonActive
                    ]}
                    onPress={() => isDark || toggleTheme()}
                  >
                    <Text 
                      style={[
                        styles.fontFamilyText,
                        isDark && styles.fontFamilyTextActive
                      ]}
                    >
                      Dark
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.settingRow}>
                <View style={styles.settingLabel}>
                  <Type size={20} color={colors.text} />
                  <Text style={styles.labelText}>Font Size</Text>
                </View>
                <View style={styles.controlsContainer}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={decreaseFontSize}
                  >
                    <Text style={styles.labelText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.controlValue}>{fontSize}</Text>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={increaseFontSize}
                  >
                    <Text style={styles.labelText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.settingRow}>
                <View style={styles.settingLabel}>
                  <Type size={20} color={colors.text} />
                  <Text style={styles.labelText}>Line Height</Text>
                </View>
                <View style={styles.controlsContainer}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={decreaseLineHeight}
                  >
                    <Text style={styles.labelText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.controlValue}>{lineHeight.toFixed(1)}</Text>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={increaseLineHeight}
                  >
                    <Text style={styles.labelText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.settingRow}>
                <View style={styles.settingLabel}>
                  <Type size={20} color={colors.text} />
                  <Text style={styles.labelText}>Font Family</Text>
                </View>
                <View style={styles.controlsContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.fontFamilyButton,
                      fontFamily === 'sans-serif' && styles.fontFamilyButtonActive
                    ]}
                    onPress={() => fontFamily !== 'sans-serif' && toggleFontFamily()}
                  >
                    <Text 
                      style={[
                        styles.fontFamilyText,
                        fontFamily === 'sans-serif' && styles.fontFamilyTextActive
                      ]}
                    >
                      Sans
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: 8 }} />
                  <TouchableOpacity 
                    style={[
                      styles.fontFamilyButton,
                      fontFamily === 'serif' && styles.fontFamilyButtonActive
                    ]}
                    onPress={() => fontFamily !== 'serif' && toggleFontFamily()}
                  >
                    <Text 
                      style={[
                        styles.fontFamilyText,
                        fontFamily === 'serif' && styles.fontFamilyTextActive
                      ]}
                    >
                      Serif
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.fontSample}>
                <Text style={styles.sampleText}>
                  This is how your text will look. Adjust the settings to make reading more comfortable for your eyes.
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}