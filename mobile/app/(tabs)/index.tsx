import React, { useState } from "react";
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter(); 
  const todayKey = new Date().toISOString().split('T')[0];
  
  // 1. STATE MANAGEMENT
  const [allData, setAllData] = useState({
    [todayKey]: [{ id: '1', text: '', calories: null, carbs: 0, protein: 0, fat: 0, isCalculating: false }]
  });
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const meals = allData[selectedDate] || [{ id: Date.now().toString(), text: '', calories: null, carbs: 0, protein: 0, fat: 0, isCalculating: false }];

  // 2. HANDLERS
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  
  const handleConfirmDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    hideDatePicker();
  };

  const updateMealsState = (newMeals) => {
    setAllData(prev => ({ ...prev, [selectedDate]: newMeals }));
  };

  const calculateNutrients = (id, text) => {
    if (!text.trim()) {
      const clearedMeals = meals.map(m => 
        m.id === id ? { ...m, calories: null, carbs: 0, protein: 0, fat: 0, isCalculating: false } : m
      );
      updateMealsState(clearedMeals);
      return;
    }

    const loadingMeals = meals.map(m => m.id === id ? { ...m, isCalculating: true } : m);
    updateMealsState(loadingMeals);

    setTimeout(() => {
      const mockCals = Math.floor(Math.random() * 300) + 100;
      const mockCarbs = Math.floor(mockCals * 0.1);
      const mockProtein = Math.floor(mockCals * 0.06);
      const mockFat = Math.floor(mockCals * 0.03);

      setAllData(prev => {
        const currentMeals = prev[selectedDate] || [];
        return {
          ...prev,
          [selectedDate]: currentMeals.map(m => 
            m.id === id ? { 
              ...m, 
              isCalculating: false, 
              calories: mockCals, 
              carbs: mockCarbs, 
              protein: mockProtein, 
              fat: mockFat 
            } : m
          )
        };
      });
    }, 1200);
  };

  const handleAddNewLine = (id, text) => {
    calculateNutrients(id, text);
    const newLine = { id: Date.now().toString(), text: '', calories: null, carbs: 0, protein: 0, fat: 0, isCalculating: false };
    updateMealsState([...meals, newLine]);
  };

  const totals = meals.reduce((acc, m) => ({
    calories: acc.calories + (m.calories || 0),
    carbs: acc.carbs + (m.carbs || 0),
    protein: acc.protein + (m.protein || 0),
    fat: acc.fat + (m.fat || 0),
  }), { calories: 0, carbs: 0, protein: 0, fat: 0 });

  // 3. RENDER COMPONENTS
  const renderMealRow = ({ item, index }) => (
    <View style={styles.mealRow}>
      <View style={styles.leftInputContainer}>
        <TextInput
          style={styles.notesInput}
          placeholder={index === 0 ? "Start logging..." : ""}
          placeholderTextColor="#D1D1D1"
          value={item.text}
          onChangeText={(val) => {
            const newMeals = [...meals];
            newMeals[index].text = val;
            if (val === '') {
              newMeals[index].calories = null;
              newMeals[index].carbs = 0;
              newMeals[index].protein = 0;
              newMeals[index].fat = 0;
            }
            updateMealsState(newMeals);
          }}
          onSubmitEditing={() => handleAddNewLine(item.id, item.text)}
          onBlur={() => calculateNutrients(item.id, item.text)}
          blurOnSubmit={false}
          autoFocus={index === meals.length - 1 && item.text === ''}
          returnKeyType="next"
        />
      </View>
      
      <View style={styles.rightInfoContainer}>
        {/* Spinner appears on the RIGHT only when calculating */}
        {item.isCalculating ? (
          <ActivityIndicator 
            size="small"
            color="#8E8E93"
            style={{ opacity: 0.6 }}
          />
        ) : (
          item.calories !== null && (
            <Animatable.View animation="fadeIn" duration={600}>
              <Text style={styles.minimalCalText}>
                {item.calories} <Text style={styles.minimalCalLabel}>cal</Text>
              </Text>
            </Animatable.View>
          )
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.container}>
          
          <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View style={styles.avatarContainer}>
                    <Text style={{fontSize:25}}>🍕</Text>
                </View>
            </View>

            <View style={styles.headerCenter}>
              <TouchableOpacity onPress={showDatePicker} style={styles.dateSelector}>
                <Text style={styles.dateText}>
                  {selectedDate === todayKey ? "Today" : selectedDate}
                </Text>
                <Ionicons name="chevron-down" size={12} color="#8E8E93" style={{marginLeft: 4}} />
              </TouchableOpacity>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.settingsCircle}
                onPress={() => router.push('/settings')}
              >
                 <Ionicons name="settings-sharp" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={meals}
            renderItem={renderMealRow}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.bottomBar}>
            <View style={styles.statItem}>
                <Text style={styles.statEmoji}>🔥</Text>
                <Text style={styles.statValue}>{totals.calories}</Text>
            </View>
            <View style={styles.dotSeparator} />
            <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: '#E91E63' }]}>C</Text>
                <Text style={styles.statValue}>{totals.carbs}</Text>
            </View>
            <View style={styles.dotSeparator} />
            <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: '#FFB300' }]}>P</Text>
                <Text style={styles.statValue}>{totals.protein}</Text>
            </View>
            <View style={styles.dotSeparator} />
            <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: '#9C27B0' }]}>F</Text>
                <Text style={styles.statValue}>{totals.fat}</Text>
            </View>
          </View>
        </View>

        <DateTimePickerModal 
          isVisible={isDatePickerVisible} 
          mode="date" 
          onConfirm={handleConfirmDate} 
          onCancel={hideDatePicker} 
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FDFBFA" },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', height: 70, marginTop: 5 },
  headerLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerRight: { flex: 1, alignItems: 'flex-end' },
  avatarContainer: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: '#FFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 5, elevation: 2,
  },
  dateSelector: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontWeight: "700", fontSize: 16, color: "#1A1A1A" },
  settingsCircle: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: '#FFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 5, elevation: 2,
  },
  scrollContent: { paddingTop: 10, paddingBottom: 120 },
  mealRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  leftInputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  notesInput: { flex: 1, fontSize: 19, color: "#333", fontWeight: "400", minHeight: 30 },
  rightInfoContainer: { paddingLeft: 12, alignItems: 'flex-end', minWidth: 70, justifyContent: 'center' },
  minimalCalText: { fontSize: 15, fontWeight: "500", color: "#A0A0A5", letterSpacing: -0.3 },
  minimalCalLabel: { fontSize: 13, fontWeight: "400", color: "#D1D1D6" },
  bottomBar: { 
    height: 65, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", 
    backgroundColor: "#FFFFFF", position: 'absolute', bottom: 25, left: 20, right: 20, 
    borderRadius: 40, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 15, elevation: 5 
  },
  statItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  statLabel: { fontWeight: "900", fontSize: 14 },
  statValue: { fontWeight: "700", fontSize: 16, color: "#333" },
  dotSeparator: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#E0E0E0" }
});