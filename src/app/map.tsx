import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CampusIcon } from '@/components/campus-icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function MapScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace('/')}
          style={({ pressed }) => [
            styles.backBtn,
            { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
            pressed && styles.pressed,
          ]}>
          <CampusIcon name="arrow-back" size={20} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>Full Campus Map</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.contentCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
        <CampusIcon name="map" size={64} />
        <Text style={[styles.subTitle, { color: theme.text }]}>Interactive Campus Map</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          High-resolution 3D building layouts, floor-by-floor navigation, and accessible wheelchair paths.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.four,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  contentCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.five,
    gap: Spacing.three,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.7,
  },
});
