import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

export type CampusIconName =
  | 'compass'
  | 'location'
  | 'notifications'
  | 'search'
  | 'mic'
  | 'close'
  | 'arrow-back'
  | 'arrow-forward'
  | 'navigate'
  | 'ar-camera'
  | 'chatbot'
  | 'sos'
  | 'calendar'
  | 'events'
  | 'bookmark'
  | 'home'
  | 'home-outline'
  | 'map'
  | 'map-outline'
  | 'chat-outline'
  | 'profile'
  | 'profile-outline'
  | 'science'
  | 'library'
  | 'union'
  | 'phone'
  | 'walk'
  | 'gps'
  | 'send';

interface CampusIconProps {
  name: CampusIconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const GLYPH_MAP: Record<CampusIconName, string> = {
  compass: '🧭',
  location: '📍',
  notifications: '🔔',
  search: '🔍',
  mic: '🎙️',
  close: '✕',
  'arrow-back': '←',
  'arrow-forward': '→',
  navigate: '➤',
  'ar-camera': '📸',
  chatbot: '💬',
  sos: '🚨',
  calendar: '📅',
  events: '📢',
  bookmark: '🔖',
  home: '🏠',
  'home-outline': '⌂',
  map: '🗺️',
  'map-outline': '🗺️',
  'chat-outline': '💬',
  profile: '👤',
  'profile-outline': '👤',
  science: '🔬',
  library: '📚',
  union: '☕',
  phone: '📞',
  walk: '🚶',
  gps: '🎯',
  send: '➤',
};

export function CampusIcon({
  name,
  size = 20,
  color,
  style,
}: CampusIconProps) {
  // Custom geometric renderer for simple navigation arrows and symbols
  if (name === 'arrow-back') {
    return (
      <View style={[styles.arrowContainer, { width: size, height: size }, style]}>
        <View
          style={[
            styles.arrowLeftChevron,
            {
              width: size * 0.45,
              height: size * 0.45,
              borderColor: color || '#0F172A',
            },
          ]}
        />
      </View>
    );
  }

  if (name === 'arrow-forward') {
    return (
      <View style={[styles.arrowContainer, { width: size, height: size }, style]}>
        <View
          style={[
            styles.arrowRightChevron,
            {
              width: size * 0.45,
              height: size * 0.45,
              borderColor: color || '#0F172A',
            },
          ]}
        />
      </View>
    );
  }

  if (name === 'close') {
    return (
      <View style={[styles.centerContainer, { width: size, height: size }, style]}>
        <Text style={[styles.textGlyph, { fontSize: size * 0.85, color: color || '#64748B' }]}>
          ✕
        </Text>
      </View>
    );
  }

  if (name === 'navigate') {
    return (
      <View style={[styles.centerContainer, { width: size, height: size }, style]}>
        <Text
          style={[
            styles.textGlyph,
            {
              fontSize: size * 0.9,
              color: color || '#FFFFFF',
              transform: [{ rotate: '-45deg' }],
            },
          ]}>
          ▲
        </Text>
      </View>
    );
  }

  if (name === 'send') {
    return (
      <View style={[styles.centerContainer, { width: size, height: size }, style]}>
        <Text
          style={[
            styles.textGlyph,
            {
              fontSize: size * 0.85,
              color: color || '#FFFFFF',
              transform: [{ rotate: '45deg' }],
            },
          ]}>
          ➤
        </Text>
      </View>
    );
  }

  const glyph = GLYPH_MAP[name] || '•';

  return (
    <View style={[styles.centerContainer, { width: size, height: size }, style]}>
      <Text
        style={[
          styles.textGlyph,
          {
            fontSize: size * 0.85,
            lineHeight: size,
            color: color || undefined,
          },
        ]}>
        {glyph}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeftChevron: {
    borderLeftWidth: 2.2,
    borderBottomWidth: 2.2,
    transform: [{ rotate: '45deg' }],
    marginLeft: 2,
  },
  arrowRightChevron: {
    borderTopWidth: 2.2,
    borderRightWidth: 2.2,
    transform: [{ rotate: '45deg' }],
    marginRight: 2,
  },
  textGlyph: {
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
