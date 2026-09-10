import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { CampusIcon } from '@/components/campus-icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface SearchHeaderProps {
  studentName?: string;
  onSearchChange?: (query: string) => void;
  onSelectCategory?: (category: string) => void;
}

const CATEGORIES = ['All', 'Libraries', 'Lecture Halls', 'Dining', 'Labs', 'Dorms'];

export function SearchHeader({
  studentName = 'Alex Morgan',
  onSearchChange,
  onSelectCategory,
}: SearchHeaderProps) {
  const theme = useTheme();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (cat: string) => {
    setSelectedCat(cat);
    onSelectCategory?.(cat);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearchChange?.(text);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar: Brand, Greeting & Profile */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={[styles.logoBadge, { backgroundColor: theme.primary }]}>
            <CampusIcon name="compass" size={24} />
          </View>
          <View>
            <Text style={[styles.brandTitle, { color: theme.primary }]}>
              Campus Navigator
            </Text>
            <Text style={[styles.greetingText, { color: theme.textSecondary }]}>
              Hi, <Text style={[styles.studentName, { color: theme.text }]}>{studentName}</Text> 👋
            </Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              { backgroundColor: theme.backgroundElement },
              pressed && styles.pressed,
            ]}>
            <CampusIcon name="notifications" size={18} />
            <View style={styles.notificationDot} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.avatarContainer,
              pressed && styles.pressed,
            ]}>
            <View style={[styles.avatarFallback, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarText}>AM</Text>
            </View>
            <View style={styles.onlineBadge} />
          </Pressable>
        </View>
      </View>

      {/* Search Input Bar */}
      <View
        style={[
          styles.searchBarContainer,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          },
        ]}>
        <View style={styles.pinIconWrapper}>
          <CampusIcon name="location" size={20} />
        </View>

        <TextInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Where do you want to go?"
          placeholderTextColor={theme.textSecondary}
          style={[styles.searchInput, { color: theme.text }]}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />

        {searchQuery.length > 0 ? (
          <Pressable onPress={() => handleSearchChange('')} style={styles.clearBtn}>
            <CampusIcon name="close" size={16} color={theme.textSecondary} />
          </Pressable>
        ) : (
          <View style={[styles.voiceButton, { backgroundColor: theme.backgroundElement }]}>
            <CampusIcon name="mic" size={16} />
          </View>
        )}
      </View>

      {/* Filter Category Chips */}
      <View style={styles.chipsScroll}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCat === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => handleCategoryPress(cat)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: isSelected ? theme.primary : theme.cardBackground,
                  borderColor: isSelected ? theme.primary : theme.cardBorder,
                },
                pressed && styles.pressed,
              ]}>
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isSelected ? '#FFFFFF' : theme.textSecondary,
                    fontWeight: isSelected ? '600' : '500',
                  },
                ]}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    gap: Spacing.three,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F2042',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 1,
  },
  studentName: {
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarFallback: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    shadowColor: '#0F2042',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  pinIconWrapper: {
    marginRight: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
  voiceButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});
