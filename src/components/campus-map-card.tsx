import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CampusIcon, CampusIconName } from '@/components/campus-icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface CampusBuilding {
  id: string;
  name: string;
  category: string;
  distance: string;
  walkTime: string;
  floorInfo: string;
  xPercent: number;
  yPercent: number;
  color: string;
  icon: CampusIconName;
}

const CAMPUS_BUILDINGS: CampusBuilding[] = [
  {
    id: 'science-hall',
    name: 'Science Hall',
    category: 'STEM & Labs',
    distance: '180m',
    walkTime: '2 min',
    floorInfo: 'Rooms 101-420 • Bio & Physics Labs',
    xPercent: 24,
    yPercent: 32,
    color: '#00B4D8',
    icon: 'science',
  },
  {
    id: 'main-library',
    name: 'Main Library',
    category: 'Study & Research',
    distance: '320m',
    walkTime: '4 min',
    floorInfo: 'Quiet Zones • Group Pods • 24/7 Floor',
    xPercent: 54,
    yPercent: 48,
    color: '#0F2042',
    icon: 'library',
  },
  {
    id: 'student-union',
    name: 'Student Union',
    category: 'Dining & Services',
    distance: '450m',
    walkTime: '6 min',
    floorInfo: 'Food Court • Bookstore • Student Lounge',
    xPercent: 78,
    yPercent: 68,
    color: '#F97316',
    icon: 'union',
  },
];

interface CampusMapCardProps {
  onBuildingSelect?: (building: CampusBuilding) => void;
  onNavigatePress?: (building: CampusBuilding) => void;
  onExploreFullMap?: () => void;
}

export function CampusMapCard({
  onBuildingSelect,
  onNavigatePress,
  onExploreFullMap,
}: CampusMapCardProps) {
  const theme = useTheme();
  const [activeBuildingId, setActiveBuildingId] = useState<string>('main-library');

  const activeBuilding =
    CAMPUS_BUILDINGS.find((b) => b.id === activeBuildingId) || CAMPUS_BUILDINGS[0];

  const handleSelectBuilding = (building: CampusBuilding) => {
    setActiveBuildingId(building.id);
    onBuildingSelect?.(building);
  };

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          },
        ]}>
        {/* Map Header Overlay */}
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.pulseLiveDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>Campus Live Map</Text>
          </View>

          <Pressable
            onPress={onExploreFullMap}
            style={({ pressed }) => [
              styles.expandBadge,
              { backgroundColor: theme.backgroundElement },
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.expandText, { color: theme.primary }]}>Full Map</Text>
            <CampusIcon name="arrow-forward" size={13} color={theme.primary} />
          </Pressable>
        </View>

        {/* Stylized Canvas Area */}
        <View style={styles.mapCanvas}>
          {/* Stylized Map Paths and Building Blocks */}
          <View style={styles.mapPathVertical} />
          <View style={styles.mapPathHorizontal} />
          <View style={styles.mapPathDiagonal} />

          {/* Stylized Building Footprints */}
          <View style={[styles.buildingFootprint, styles.footprintScience]} />
          <View style={[styles.buildingFootprint, styles.footprintLibrary]} />
          <View style={[styles.buildingFootprint, styles.footprintUnion]} />

          {/* Central Lawn Area */}
          <View style={styles.lawnArea}>
            <Text style={styles.lawnLabel}>Central Quad</Text>
          </View>

          {/* "You Are Here" Marker */}
          <View style={[styles.userLocationMarker, { left: '42%', top: '22%' }]}>
            <View style={styles.userPulseRing} />
            <View style={styles.userDot} />
          </View>

          {/* Interactive Building Pins */}
          {CAMPUS_BUILDINGS.map((building) => {
            const isSelected = activeBuilding.id === building.id;
            return (
              <Pressable
                key={building.id}
                onPress={() => handleSelectBuilding(building)}
                style={[
                  styles.pinWrapper,
                  {
                    left: `${building.xPercent}%`,
                    top: `${building.yPercent}%`,
                  },
                ]}>
                {isSelected && (
                  <View
                    style={[
                      styles.selectedGlowRing,
                      { borderColor: building.color },
                    ]}
                  />
                )}
                <View
                  style={[
                    styles.pinBadge,
                    {
                      backgroundColor: building.color,
                      transform: [{ scale: isSelected ? 1.15 : 1.0 }],
                    },
                  ]}>
                  <CampusIcon
                    name={building.icon}
                    size={16}
                    color="#FFFFFF"
                  />
                </View>

                <View
                  style={[
                    styles.pinCallout,
                    {
                      backgroundColor: isSelected ? theme.primary : '#FFFFFF',
                      borderColor: isSelected ? theme.primary : '#E2E8F0',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.pinCalloutText,
                      { color: isSelected ? '#FFFFFF' : '#1E293B' },
                    ]}
                    numberOfLines={1}>
                    {building.name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Selected Building Details Strip */}
        <View
          style={[
            styles.detailsCard,
            {
              backgroundColor: theme.backgroundElement,
              borderTopColor: theme.cardBorder,
            },
          ]}>
          <View style={styles.detailsLeft}>
            <View
              style={[
                styles.detailsIconBadge,
                { backgroundColor: activeBuilding.color },
              ]}>
              <CampusIcon
                name={activeBuilding.icon}
                size={22}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.detailsTextCol}>
              <View style={styles.titleRow}>
                <Text style={[styles.buildingTitle, { color: theme.text }]}>
                  {activeBuilding.name}
                </Text>
                <View style={[styles.categoryTag, { backgroundColor: theme.cardBackground }]}>
                  <Text style={[styles.categoryTagText, { color: theme.accentTealDark }]}>
                    {activeBuilding.category}
                  </Text>
                </View>
              </View>
              <Text style={[styles.buildingMeta, { color: theme.textSecondary }]}>
                {activeBuilding.distance} • {activeBuilding.walkTime} walk • {activeBuilding.floorInfo}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => onNavigatePress?.(activeBuilding)}
            style={({ pressed }) => [
              styles.navigateButton,
              { backgroundColor: theme.primary },
              pressed && styles.pressed,
            ]}>
            <CampusIcon name="navigate" size={14} color="#FFFFFF" />
            <Text style={styles.navigateButtonText}>Go</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#0F2042',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  expandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  expandText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mapCanvas: {
    width: '100%',
    height: 200,
    backgroundColor: '#E8F5E9', // Soft subtle university garden green tint
    position: 'relative',
    overflow: 'hidden',
  },
  mapPathVertical: {
    position: 'absolute',
    left: '48%',
    top: 0,
    bottom: 0,
    width: 22,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
  mapPathHorizontal: {
    position: 'absolute',
    top: '52%',
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
  mapPathDiagonal: {
    position: 'absolute',
    top: -40,
    left: '20%',
    width: 18,
    height: 300,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '38deg' }],
    opacity: 0.8,
  },
  buildingFootprint: {
    position: 'absolute',
    backgroundColor: '#CBD5E1',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  footprintScience: {
    left: 20,
    top: 25,
    width: 70,
    height: 48,
  },
  footprintLibrary: {
    left: '44%',
    top: 60,
    width: 84,
    height: 52,
  },
  footprintUnion: {
    right: 18,
    bottom: 20,
    width: 76,
    height: 50,
  },
  lawnArea: {
    position: 'absolute',
    left: '32%',
    top: '30%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#C8E6C9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  lawnLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2E7D32',
  },
  userLocationMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPulseRing: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0, 180, 216, 0.3)',
  },
  userDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00B4D8',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
    marginLeft: -24,
    marginTop: -28,
  },
  selectedGlowRing: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2.5,
    top: -4,
    opacity: 0.5,
  },
  pinBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  pinCallout: {
    marginTop: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pinCalloutText: {
    fontSize: 10,
    fontWeight: '700',
  },
  detailsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderTopWidth: 1,
  },
  detailsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.two,
    marginRight: Spacing.two,
  },
  detailsIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsTextCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  buildingTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  buildingMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    shadowColor: '#0F2042',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  pressed: {
    opacity: 0.75,
  },
});
