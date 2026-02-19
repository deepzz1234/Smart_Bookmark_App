"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Login() {

  const signupWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://smart-bookmark-app-five-woad.vercel.app/dashboard",
      },
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Sign Up</h2>

      <button onClick={signupWithGoogle}>
        Continue with Google
      </button>
    </div>
  );
}