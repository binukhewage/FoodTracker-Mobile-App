import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import { signInWithGoogle } from '@/services/auth';
import { supabase } from '@/lib/supabase';

export default function SettingsScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();

  const user = session?.user;
  const name =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    'User';
  const email = user?.email;

  const SettingItem = ({
    icon,
    title,
    value = '',
    color = '#333',
  }: any) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: color + '15' },
          ]}
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {value ? (
          <Text style={styles.itemValue}>{value}</Text>
        ) : null}
        <Ionicons
          name="chevron-forward"
          size={18}
          color="#D1D1D6"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* AUTH SECTION */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#6366f1"
            style={{ marginVertical: 30 }}
          />
        ) : user ? (
          /* LOGGED IN */
          <View style={styles.profileCard}>
            <View style={styles.avatarLarge}>
              <Text style={{ fontSize: 40 }}>🐈</Text>
            </View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        ) : (
          /* LOGGED OUT */
          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Welcome to AMY</Text>
            <Text style={styles.loginSubtitle}>
              Sign in to sync your meal logs and health data.
            </Text>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={signInWithGoogle}
            >
              <Ionicons
                name="logo-google"
                size={20}
                color="#FFF"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.googleButtonText}>
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SETTINGS */}
        <Text style={styles.sectionLabel}>PHYSICAL STATS</Text>
        <View style={styles.group}>
          <SettingItem
            icon="resize-outline"
            title="Height"
            value="175 cm"
            color="#6366f1"
          />
          <View style={styles.separator} />
          <SettingItem
            icon="speedometer-outline"
            title="Weight"
            value="68 kg"
            color="#10b981"
          />
        </View>

        <Text style={styles.sectionLabel}>GOALS & TARGETS</Text>
        <View style={styles.group}>
          <SettingItem
            icon="flame-outline"
            title="Daily Calories"
            value="2,200"
            color="#E91E63"
          />
          <View style={styles.separator} />
          <SettingItem
            icon="water-outline"
            title="Hydration"
            value="2.5L"
            color="#0ea5e9"
          />
          <View style={styles.separator} />
          <SettingItem
            icon="barbell-outline"
            title="Weight Goal"
            value="Lose 2kg"
            color="#f59e0b"
          />
        </View>

        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.group}>
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            color="#8E8E93"
          />
          <View style={styles.separator} />
          <SettingItem
            icon="lock-closed-outline"
            title="Privacy"
            color="#8E8E93"
          />
        </View>

        {/* LOGOUT */}
        {user && (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              await supabase.auth.signOut();
              router.replace('/');
            }}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* styles unchanged */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDFBFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A1A' },
  content: { padding: 20 },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },
  loginCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userName: { fontSize: 20, fontWeight: '700', color: '#333' },
  userEmail: { fontSize: 14, color: '#8E8E93', marginTop: 2 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A0A0A5',
    letterSpacing: 1.2,
    marginBottom: 12,
    marginLeft: 4,
  },
  group: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemText: { fontSize: 16, fontWeight: '500', color: '#333' },
  itemValue: { fontSize: 15, color: '#8E8E93', marginRight: 8 },
  separator: { height: 1, backgroundColor: '#F2F2F7' },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    color: '#D1D1D6',
    fontSize: 11,
    marginTop: 20,
  },
});
