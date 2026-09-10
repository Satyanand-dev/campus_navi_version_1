import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CampusIcon } from '@/components/campus-icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ChatbotScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [input, setInput] = useState('');

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
        <Text style={[styles.title, { color: theme.text }]}>Campus AI Assistant</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.chatCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
        <View style={styles.messagesContainer}>
          <View style={[styles.botBubble, { backgroundColor: `${theme.primary}12` }]}>
            <Text style={[styles.botText, { color: theme.text }]}>
              Hello Alex! How can I help you navigate campus today? You can ask for directions, dining hours, or professor offices.
            </Text>
          </View>
        </View>

        <View style={[styles.inputRow, { borderColor: theme.cardBorder }]}>
          <TextInput
            placeholder="Ask Campus AI..."
            placeholderTextColor={theme.textSecondary}
            value={input}
            onChangeText={setInput}
            style={[styles.textInput, { color: theme.text }]}
          />
          <Pressable style={[styles.sendBtn, { backgroundColor: theme.primary }]}>
            <CampusIcon name="send" size={16} color="#FFFFFF" />
          </Pressable>
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
  chatCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    gap: Spacing.three,
  },
  botBubble: {
    padding: 14,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    maxWidth: '85%',
  },
  botText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 10,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
