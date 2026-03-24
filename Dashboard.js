// Dashboard.js
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = supabase.auth.user();
      setUser(currentUser);

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      setPoints(userData?.points || 0);

      const { data: feed } = await supabase
        .from("posts")
        .select("*, users(name, profile_pic), locations(name)")
        .order("created_at", { ascending: false });

      setPosts(feed || []);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <h2>Points: {points}</h2>
      <Link to="/leaderboard">View Leaderboard</Link>
      <h3>Feed</h3>
      {posts.map((p) => (
        <div key={p.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <strong>{p.users?.name}</strong> @ {p.locations?.name}
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
