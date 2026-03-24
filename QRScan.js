// QRScan.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { QrReader } from "react-qr-reader";

export default function QRScan() {
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  const handleScan = async (result) => {
    if (!result || scanned) return;
    setScanned(true);
    const qrCode = result?.text || result;

    // Find location by QR
    const { data: location } = await supabase
      .from("locations")
      .select("*")
      .eq("qr_code", qrCode)
      .single();

    if (!location) return alert("Invalid QR code");

    // Check if user is logged in
    const user = supabase.auth.user();
    if (!user) {
      navigate("/signup", { state: { location_id: location.id } });
      return;
    }

    // Create check-in
    await supabase.from("checkins").insert({
      user_id: user.id,
      location_id: location.id,
      points_earned: location.point_value,
    });

    // Update user points
    await supabase.rpc("update_user_points", { uid: user.id, points: location.point_value });

    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Scan QR to Check-in</h1>
      <QrReader
        onResult={(result) => handleScan(result)}
        constraints={{ facingMode: "environment" }}
      />
    </div>
  );
}
