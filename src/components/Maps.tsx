"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Custom icons
const patientIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177361.png", // blue person
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const donorIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png", // red location pin
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

// Haversine formula
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function DonorMap() {
  const patientPos: [number, number] = [12.9716, 77.5946];
  const [nearby, setNearby] = useState<any[]>([]);

  const donors = [
    { id: 1, name: "Donor A", lat: 12.9717, lon: 77.5947, blood: "A+" },
    { id: 2, name: "Donor B", lat: 12.9718, lon: 77.5949, blood: "B+" },
    { id: 3, name: "Donor C", lat: 12.9750, lon: 77.6000, blood: "O-" },
  ];

  useEffect(() => {
    const filtered = donors.filter(
      (d) => haversine(patientPos[0], patientPos[1], d.lat, d.lon) <= 0.1
    );
    setNearby(filtered);
  }, []);

  return (
    <MapContainer center={patientPos} zoom={16} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Patient marker */}
      <Marker position={patientPos} icon={patientIcon}>
        <Popup>
          <b>🩺 You (Patient)</b> <br />
          Location: {patientPos[0]}, {patientPos[1]}
        </Popup>
      </Marker>

      {/* 100m radius */}
      <Circle center={patientPos} radius={100} color="blue" />

      {/* Donors */}
      {nearby.map((d) => (
        <Marker key={d.id} position={[d.lat, d.lon]} icon={donorIcon}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <h3>🧑 {d.name}</h3>
              <p>🩸 Blood Group: <b>{d.blood}</b></p>
              <button style={{ background: "#e63946", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}>
                Request Donation
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
