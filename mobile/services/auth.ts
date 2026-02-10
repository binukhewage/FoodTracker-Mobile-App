import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectUrl = Linking.createURL("login-callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error("Google auth error:", error);
    throw error;
  }

  if (data?.url) {
    await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUrl
    );
  }
}
