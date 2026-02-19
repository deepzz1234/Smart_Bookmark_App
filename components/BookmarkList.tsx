
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  //  fetch function
  const fetchBookmarks = async () => {
    if (!user?.id) return;

    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  //  INITIAL LOAD + REALTIME
  useEffect(() => {
    if (!user?.id) return;

    fetchBookmarks();

    const channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks(); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  //  TAB TO TAB SYNC (same browser)
  useEffect(() => {
    const bc = new BroadcastChannel("bookmarks_channel");

    bc.onmessage = () => {
      fetchBookmarks();
    };

    return () => bc.close();
  }, []);

  // 🗑 DELETE
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);

    //  notify other tabs
    new BroadcastChannel("bookmarks_channel").postMessage("refresh");
  };

  //  COPY
  const copyToClipboard = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!bookmarks.length) {
    return <div>No bookmarks yet 🚀</div>;
  }

  return (
    <div className="bookmark-list">
      {bookmarks.map((b) => (
        <div key={b.id} className="bookmark-item">

          <div className="bookmark-info">
            <h3 className="bookmark-title">{b.title}</h3>

            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bookmark-url"
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${b.url}`}
                className="w-4 h-4"
              />
              {b.url}
            </a>
          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => copyToClipboard(b.url, b.id)}
              className="copy-btn"
            >
              {copiedId === b.id ? "✓" : "Copy"}
            </button>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="delete-btn"
            >
              Delete
            </button>

          </div>

        </div>
      ))}
    </div>
  );
}




