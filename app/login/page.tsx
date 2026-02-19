"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Login() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // redirectTo: "http://localhost:3000/dashboard",
        redirectTo:"https://smart-bookmark-app-five-woad.vercel.app/dashboard"
      },
    });
  };

  return (
    <main className="login-main">

      <div className="login-card">

        <img src="https://www.svgrepo.com/show/454180/bookmark-favorite-star.svg" alt="logo" className="login-logo" />

        <h2 className="login-title">
          Smart Bookmark
        </h2>

        <p className="login-subtitle">
          Your personal space for everything worth saving.
        </p>

        <button onClick={loginWithGoogle} className="google-login-btn">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="google-icon"
          />
          Continue with Google
        </button>

      </div>

    </main>
  );
}

