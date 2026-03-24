// Leaderboard.js
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .order("points", { ascending: false })
        .limit(10);
      setLeaders(data);
    };
    fetchLeaders();
  }, []);

  return (
    <div>
      <h1>Top Zartour Users</h1>
      {leaders.map((u, i) => (
        <div key={u.id}>
          {i + 1}. {u.name} - {u.points} pts
        </div>
      ))}
    </div>
  );
}
