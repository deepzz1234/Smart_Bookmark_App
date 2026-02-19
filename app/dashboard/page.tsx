"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); 
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  //  this will be called after add/delete
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return <div className="dashboard-loading">Preparing your workspace...</div>;
  }

  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    "Creator";

  return (
    <main className="dashboard-main">
      <div className="dashboard-card">

        <div className="dashboard-header">
          <h1 className="dashboard-welcome">
            Welcome back, {name} ✨
          </h1>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="dashboard-divider" />

        {/*  pass refresh function */}
        <AddBookmark user={user}
         onAdd={handleRefresh} />

        {/*  key forces re-fetch */}
        <BookmarkList
          user={user}
          refreshKey={refreshKey}
          onDelete={handleRefresh}
        />

      </div>
    </main>
  );
}
