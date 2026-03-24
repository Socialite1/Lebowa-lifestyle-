// Signup.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const locationState = useLocation().state || {};

  const handleSignup = async () => {
    const { user, error } = await supabase.auth.signUp({ email });
    if (error) return alert(error.message);

    // Insert into users table
    await supabase.from("users").insert({ id: user.id, name, email });

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Create Account</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
