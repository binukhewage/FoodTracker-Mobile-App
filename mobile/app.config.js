export default {
  expo: {
    name: "FoodTracker",
    slug: "foodtracker",

    // ✅ REQUIRED for OAuth redirect (THIS FIXES localhost issue)
    scheme: "foodtracker",

    // Optional but STRONGLY recommended
    ios: {
      bundleIdentifier: "com.yourname.foodtracker",
    },
    android: {
      package: "com.yourname.foodtracker",
    },

    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
