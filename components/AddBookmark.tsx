

 "use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmark({ user, onAdd }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!title || !url) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    setLoading(false);

    if (error) {
      alert("❌ Failed to add bookmark");
      console.log(error);
    } else {
      alert("✅ Bookmark added successfully!");

      // clear inputs
      setTitle("");
      setUrl("");

      // refresh list in dashboard
      
      new BroadcastChannel("bookmarks_channel").postMessage("refresh");
    }
  };

  return (
    <div className="flex gap-2 mb-6">

      <input
        className="border p-2 rounded w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

     <button
  type="button"
  onClick={addBookmark}
  disabled={loading}
  className="bg-indigo-600 text-white px-4 rounded
             cursor-pointer
             disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Adding..." : "Add"}
</button>

    </div>
  );
}



