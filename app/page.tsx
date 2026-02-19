"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {

  const [showGuide, setShowGuide] = useState(false);

  return (
    <main className="hero">

      <div className="hero-left">

        <span className="hero-badge">
          🚀 Built with Next.js + Supabase
        </span>

        <h1 className="hero-title">
          Smart Bookmark App 🔖
        </h1>

        <div className="hero-subtitle">
          <div>⚡ Instant bookmark saving</div>
          <div>🔄 Real-time sync</div>
          <div>📱 Access anywhere</div>
          <div>🔐 Google secure login</div>
        </div>

        <div className="hero-btn-group">
          <Link href="/login">
            <button className="signin-btn">Sign In</button>
          </Link>

          <Link href="/login">
            <button className="signup-btn">Get Started</button>
          </Link>
        </div>

      </div>

      <div className="hero-preview">
        <img
          src="https://www.svgrepo.com/show/454180/bookmark-favorite-star.svg"
          className="app-mockup"
          onClick={() => setShowGuide(true)}
        />
      </div>

    </main>
  );
}




