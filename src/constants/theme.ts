/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#F8FAFC',
    backgroundElement: '#F1F5F9',
    backgroundSelected: '#E2E8F0',
    textSecondary: '#64748B',
    // Campus Navigator Specific Palette
    primary: '#0F2042',
    primaryDark: '#0A152C',
    primaryLight: '#1E3A8A',
    accentTeal: '#00B4D8',
    accentTealDark: '#0D9488',
    accentOrange: '#F97316',
    sosRed: '#EF4444',
    sosRedDark: '#DC2626',
    cardBackground: '#FFFFFF',
    cardBorder: '#E2E8F0',
    tagBackground: '#E0F2FE',
    tagText: '#0369A1',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0B1120',
    backgroundElement: '#1E293B',
    backgroundSelected: '#334155',
    textSecondary: '#94A3B8',
    // Campus Navigator Specific Palette
    primary: '#1E3A8A',
    primaryDark: '#0F2042',
    primaryLight: '#3B82F6',
    accentTeal: '#38BDF8',
    accentTealDark: '#0284C7',
    accentOrange: '#FB923C',
    sosRed: '#F87171',
    sosRedDark: '#EF4444',
    cardBackground: '#1E293B',
    cardBorder: '#334155',
    tagBackground: '#0C4A6E',
    tagText: '#BAE6FD',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
