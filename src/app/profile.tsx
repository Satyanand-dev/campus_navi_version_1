import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CampusIcon } from '@/components/campus-icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
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
        <Text style={[styles.title, { color: theme.text }]}>Student Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.profileCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.avatarText}>AM</Text>
        </View>
        <Text style={[styles.name, { color: theme.text }]}>Alex Morgan</Text>
        <Text style={[styles.major, { color: theme.textSecondary }]}>
          Computer Science & Engineering • Class of 2026
        </Text>
        <View style={[styles.idBadge, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.idText, { color: theme.textSecondary }]}>Student ID: #9842105</Text>
        </View>
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
  profileCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.five,
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
  },
  major: {
    fontSize: 13,
    textAlign: 'center',
  },
  idBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  idText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});
