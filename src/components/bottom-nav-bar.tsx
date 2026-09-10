import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CampusIcon, CampusIconName } from '@/components/campus-icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type NavTabId = 'home' | 'map' | 'chatbot' | 'profile';

interface BottomNavBarProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
}

interface NavItem {
  id: NavTabId;
  label: string;
  iconActive: CampusIconName;
  iconInactive: CampusIconName;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    iconActive: 'home',
    iconInactive: 'home-outline',
  },
  {
    id: 'map',
    label: 'Map',
    iconActive: 'map',
    iconInactive: 'map-outline',
  },
  {
    id: 'chatbot',
    label: 'Chatbot',
    iconActive: 'chatbot',
    iconInactive: 'chat-outline',
    badge: 'AI',
  },
  {
    id: 'profile',
    label: 'Profile',
    iconActive: 'profile',
    iconInactive: 'profile-outline',
  },
];

export function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  const theme = useTheme();

  return (
    <View style={styles.outerWrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.cardBorder,
          },
        ]}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onTabChange(item.id)}
              style={({ pressed }) => [
                styles.tabItem,
                pressed && styles.pressed,
              ]}>
              <View
                style={[
                  styles.iconPill,
                  isActive && [
                    styles.activeIconPill,
                    { backgroundColor: `${theme.primary}12` },
                  ],
                ]}>
                <CampusIcon
                  name={isActive ? item.iconActive : item.iconInactive}
                  size={22}
                  color={isActive ? theme.primary : theme.textSecondary}
                />
                {item.badge && (
                  <View
                    style={[
                      styles.tabBadge,
                      { backgroundColor: theme.accentTeal },
                    ]}>
                    <Text style={styles.tabBadgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? theme.primary : theme.textSecondary,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}>
                {item.label}
              </Text>

              {isActive && (
                <View
                  style={[
                    styles.activeIndicatorDot,
                    { backgroundColor: theme.primary },
                  ]}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    shadowColor: '#0F2042',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 1,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: Spacing.three,
    position: 'relative',
    minWidth: 64,
  },
  iconPill: {
    width: 44,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeIconPill: {},
  tabBadge: {
    position: 'absolute',
    top: 0,
    right: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  activeIndicatorDot: {
    position: 'absolute',
    bottom: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
