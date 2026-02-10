import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // This line hides the entire tab bar across all screens in this group
        tabBarStyle: { display: 'none' }, 
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
} 