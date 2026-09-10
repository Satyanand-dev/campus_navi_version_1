import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CampusIcon, CampusIconName } from '@/components/campus-icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface QuickAccessAction {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  accentColor: string;
  iconName: CampusIconName;
  isSpecialSOS?: boolean;
}

interface QuickAccessGridProps {
  onActionPress?: (actionId: string) => void;
}

export function QuickAccessGrid({ onActionPress }: QuickAccessGridProps) {
  const theme = useTheme();
  const [sosModalVisible, setSosModalVisible] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<{
    title: string;
    description: string;
    icon: CampusIconName;
    accent: string;
  } | null>(null);

  const actions: QuickAccessAction[] = [
    {
      id: 'ar_navigate',
      title: 'AR Navigate',
      subtitle: 'Camera wayfinding',
      badge: 'Live AR',
      accentColor: theme.accentTeal,
      iconName: 'ar-camera',
    },
    {
      id: 'ai_chatbot',
      title: 'AI Chatbot',
      subtitle: 'Campus assistant',
      badge: 'Smart',
      accentColor: theme.primary,
      iconName: 'chatbot',
    },
    {
      id: 'emergency_sos',
      title: 'Emergency SOS',
      subtitle: 'Campus security',
      badge: '24/7 Aid',
      accentColor: '#EF4444',
      iconName: 'sos',
      isSpecialSOS: true,
    },
    {
      id: 'timetable',
      title: 'Timetable',
      subtitle: 'Next: CS 201 @ 11AM',
      badge: 'Today',
      accentColor: '#2563EB',
      iconName: 'calendar',
    },
    {
      id: 'events',
      title: 'Events',
      subtitle: 'Tech Fair & Socials',
      badge: '3 New',
      accentColor: '#F97316',
      iconName: 'events',
    },
    {
      id: 'saved_places',
      title: 'Saved Places',
      subtitle: 'Dorm, Lab & Favs',
      badge: '5 Saved',
      accentColor: '#0D9488',
      iconName: 'bookmark',
    },
  ];

  const handlePress = (action: QuickAccessAction) => {
    if (action.isSpecialSOS) {
      setSosModalVisible(true);
    } else {
      setActiveInfoModal({
        title: action.title,
        description:
          action.id === 'ar_navigate'
            ? 'Augmented Reality wayfinding initializes your camera to project navigation arrows on university walkways.'
            : action.id === 'ai_chatbot'
            ? 'Campus AI is ready to answer questions regarding library hours, dining menus, and classroom locations.'
            : action.id === 'timetable'
            ? 'Today\'s Classes:\n• 11:00 AM: CS 201 Algorithms (Science Hall 302)\n• 02:00 PM: Physics Lab (Hall 105)'
            : action.id === 'events'
            ? 'Upcoming Events:\n• Career Fair: Student Union (10 AM - 4 PM)\n• Robotics Demo: Engineering Quad (5 PM)'
            : 'Saved Locations:\n• Dorm 4B (West Campus)\n• Quiet Study Pod #12 (Main Library Floor 3)',
        icon: action.iconName,
        accent: action.accentColor,
      });
    }
    onActionPress?.(action.id);
  };

  const renderIcon = (action: QuickAccessAction) => {
    const iconColor = action.isSpecialSOS ? '#FFFFFF' : action.accentColor;
    return <CampusIcon name={action.iconName} size={24} color={iconColor} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Quick Access
        </Text>
        <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
          Campus services & tools
        </Text>
      </View>

      <View style={styles.grid}>
        {actions.map((action) => {
          const isSos = action.isSpecialSOS;
          return (
            <Pressable
              key={action.id}
              onPress={() => handlePress(action)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: isSos ? '#EF4444' : theme.cardBackground,
                  borderColor: isSos ? '#DC2626' : theme.cardBorder,
                },
                isSos ? styles.sosShadow : styles.cardShadow,
                pressed && styles.pressed,
              ]}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: isSos
                        ? 'rgba(255, 255, 255, 0.25)'
                        : `${action.accentColor}15`,
                    },
                  ]}>
                  {renderIcon(action)}
                </View>

                {action.badge && (
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: isSos
                          ? '#FFFFFF'
                          : `${action.accentColor}18`,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.badgeText,
                        {
                          color: isSos ? '#DC2626' : action.accentColor,
                          fontWeight: '700',
                        },
                      ]}>
                      {action.badge}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.cardBody}>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isSos ? '#FFFFFF' : theme.text },
                  ]}>
                  {action.title}
                </Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    {
                      color: isSos
                        ? 'rgba(255, 255, 255, 0.9)'
                        : theme.textSecondary,
                    },
                  ]}
                  numberOfLines={1}>
                  {action.subtitle}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Emergency SOS Modal */}
      <Modal
        visible={sosModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSosModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.sosModalCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.sosAlertHeader}>
              <View style={styles.sosAlertIconContainer}>
                <CampusIcon name="sos" size={32} />
              </View>
              <Text style={styles.sosModalTitle}>Emergency SOS Assistance</Text>
              <Text style={[styles.sosModalSub, { color: theme.textSecondary }]}>
                Immediate 24/7 response services for campus safety.
              </Text>
            </View>

            <View style={styles.sosButtonsList}>
              <Pressable
                style={[styles.sosActionRow, { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }]}
                onPress={() => setSosModalVisible(false)}>
                <CampusIcon name="phone" size={22} color="#DC2626" />
                <View style={styles.sosActionInfo}>
                  <Text style={[styles.sosActionTitle, { color: '#991B1B' }]}>
                    Campus Police Dispatch
                  </Text>
                  <Text style={[styles.sosActionMeta, { color: '#B91C1C' }]}>
                    Ext 5555 • Dedicated On-Campus Rapid Response
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={[styles.sosActionRow, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}
                onPress={() => setSosModalVisible(false)}>
                <CampusIcon name="walk" size={22} color="#B45309" />
                <View style={styles.sosActionInfo}>
                  <Text style={[styles.sosActionTitle, { color: '#92400E' }]}>
                    Request Night Escort
                  </Text>
                  <Text style={[styles.sosActionMeta, { color: '#B45309' }]}>
                    Free student safety patrol to walk you to your dorm
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={[styles.sosActionRow, { backgroundColor: '#E0F2FE', borderColor: '#BAE6FD' }]}
                onPress={() => setSosModalVisible(false)}>
                <CampusIcon name="gps" size={22} color="#0369A1" />
                <View style={styles.sosActionInfo}>
                  <Text style={[styles.sosActionTitle, { color: '#075985' }]}>
                    Share Live GPS with Security
                  </Text>
                  <Text style={[styles.sosActionMeta, { color: '#0284C7' }]}>
                    Transmits your real-time campus coordinates
                  </Text>
                </View>
              </Pressable>
            </View>

            <Pressable
              onPress={() => setSosModalVisible(false)}
              style={[styles.closeModalButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.closeModalButtonText}>Close Alert</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* General Action Detail Modal */}
      <Modal
        visible={activeInfoModal !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveInfoModal(null)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.infoModalCard, { backgroundColor: theme.cardBackground }]}>
            <View
              style={[
                styles.modalHeaderBadge,
                { backgroundColor: `${activeInfoModal?.accent}18` },
              ]}>
              <CampusIcon
                name={activeInfoModal?.icon || 'compass'}
                size={28}
                color={activeInfoModal?.accent || theme.primary}
              />
            </View>
            <Text style={[styles.infoModalTitle, { color: theme.text }]}>
              {activeInfoModal?.title}
            </Text>
            <Text style={[styles.infoModalDesc, { color: theme.textSecondary }]}>
              {activeInfoModal?.description}
            </Text>

            <Pressable
              onPress={() => setActiveInfoModal(null)}
              style={[styles.closeModalButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.closeModalButtonText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    gap: Spacing.two,
  },
  sectionHeader: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 20,
    borderWidth: 1,
    padding: Spacing.three,
    justifyContent: 'space-between',
    minHeight: 112,
  },
  cardShadow: {
    shadowColor: '#0F2042',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  sosShadow: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
  },
  cardBody: {
    gap: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  sosModalCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  sosAlertHeader: {
    alignItems: 'center',
    gap: 8,
  },
  sosAlertIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  sosModalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#DC2626',
    textAlign: 'center',
  },
  sosModalSub: {
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: Spacing.two,
  },
  sosButtonsList: {
    gap: 10,
    marginVertical: 4,
  },
  sosActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  sosActionInfo: {
    flex: 1,
  },
  sosActionTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  sosActionMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  closeModalButton: {
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  closeModalButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  infoModalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    padding: Spacing.four,
    alignItems: 'center',
    gap: 12,
  },
  modalHeaderBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  infoModalDesc: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});
