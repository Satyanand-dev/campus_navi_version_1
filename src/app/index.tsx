import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNavBar, NavTabId } from '@/components/bottom-nav-bar';
import { CampusBuilding, CampusMapCard } from '@/components/campus-map-card';
import { QuickAccessGrid } from '@/components/quick-access-grid';
import { SearchHeader } from '@/components/search-header';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleTabChange = (tab: NavTabId) => {
    setActiveTab(tab);
    if (tab === 'map') {
      router.push('/map');
    } else if (tab === 'chatbot') {
      router.push('/chatbot');
    } else if (tab === 'profile') {
      router.push('/profile');
    }
  };

  const handleBuildingSelect = (building: CampusBuilding) => {
    // Optionally handle selection
  };

  const handleNavigate = (building: CampusBuilding) => {
    Alert.alert(
      `Starting Navigation: ${building.name}`,
      `Distance: ${building.distance} (${building.walkTime} walk)\n\nFollow the highlighted pathway towards the Central Quad to reach ${building.name}.`,
      [
        {
          text: 'Open AR Mode',
          onPress: () => router.push('/map'),
        },
        { text: 'OK', style: 'default' },
      ]
    );
  };

  const handleExploreFullMap = () => {
    router.push('/map');
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'ai_chatbot') {
      router.push('/chatbot');
    } else if (actionId === 'ar_navigate') {
      router.push('/map');
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === '#0B1120' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <View style={styles.contentWrapper}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}>
          {/* Top Bar: Brand, Student Greeting, Search Bar & Category Chips */}
          <SearchHeader
            studentName="Alex Morgan"
            onSearchChange={setSearchQuery}
            onSelectCategory={setSelectedCategory}
          />

          {/* Large Stylized Campus Map Preview Card */}
          <CampusMapCard
            onBuildingSelect={handleBuildingSelect}
            onNavigatePress={handleNavigate}
            onExploreFullMap={handleExploreFullMap}
          />

          {/* Grid of 6 Quick-Access Icon Buttons */}
          <QuickAccessGrid onActionPress={handleQuickAction} />

          {/* Bottom spacing to account for bottom navigation bar */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.four,
    gap: Spacing.two,
  },
  bottomSpacer: {
    height: Platform.OS === 'ios' ? 24 : 16,
  },
});
