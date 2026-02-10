import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Profile</ThemedText>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={18} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* User Info Card */}
        <View style={styles.sectionCard}>
          <View style={styles.avatarLarge}>
            <ThemedText style={{ fontSize: 40 }}>🐈</ThemedText>
          </View>
          <ThemedText style={styles.userName}>Amy User</ThemedText>
          <ThemedText style={styles.userEmail}>amy.dev@example.com</ThemedText>
        </View>

        {/* Physical Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { marginRight: 12 }]}>
            <ThemedText style={styles.statLabel}>Height</ThemedText>
            <ThemedText style={styles.statValue}>175 <ThemedText style={styles.unit}>cm</ThemedText></ThemedText>
          </View>
          <View style={styles.statBox}>
            <ThemedText style={styles.statLabel}>Weight</ThemedText>
            <ThemedText style={styles.statValue}>68 <ThemedText style={styles.unit}>kg</ThemedText></ThemedText>
          </View>
        </View>

        {/* Goals & Targets Section */}
        <ThemedText style={styles.sectionTitle}>Goals & Targets</ThemedText>
        
        <View style={styles.sectionCard}>
          <View style={styles.goalItem}>
            <View style={[styles.goalIcon, { backgroundColor: '#EEF0FF' }]}>
              <Ionicons name="flame" size={20} color="#6366f1" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.goalName}>Daily Calories</ThemedText>
              <ThemedText style={styles.goalTarget}>Target: 2,200 kcal</ThemedText>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.goalItem}>
            <View style={[styles.goalIcon, { backgroundColor: '#FFF0F5' }]}>
              <Ionicons name="barbell" size={20} color="#E91E63" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.goalName}>Weight Goal</ThemedText>
              <ThemedText style={styles.goalTarget}>Lose 2kg in 30 days</ThemedText>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.goalItem}>
            <View style={[styles.goalIcon, { backgroundColor: '#FFF9E6' }]}>
              <Ionicons name="water" size={20} color="#FFB300" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.goalName}>Hydration</ThemedText>
              <ThemedText style={styles.goalTarget}>2.5 Liters / day</ThemedText>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FDFBFA", // Matches Home Screen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
    marginBottom: 20,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  unit: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  goalTarget: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#F2F2F7',
    width: '100%',
    marginVertical: 16,
  },
});