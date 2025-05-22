import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = 'Search', 
  onSearch 
}: SearchBarProps) {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 48,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontFamily: 'NunitoSans-Regular',
      fontSize: 16,
      color: colors.text,
    },
    clearButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.text + '80'} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text + '60'}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <X size={20} color={colors.text + '80'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}