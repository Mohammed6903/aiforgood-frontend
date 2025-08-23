"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Custom icons
const patientIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177361.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const donorIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export default function DonorMap() {
  // Use Fairfield by Mariott location
  const patientPos: [number, number] = [17.42424, 78.34750];
  const [nearby, setNearby] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/donors/nearby-donors",
          {
            lng: patientPos[1], // longitude
            lat: patientPos[0], // latitude
            radius: 10000, // radius in km
          }
        );

        console.log(res);

        // Map backend fields to frontend-friendly format
        const donors = Array.isArray(res.data)
          ? res.data
              .filter((d: any) => typeof d.lat === "number" && typeof d.lng === "number")
              .map((d: any) => ({
            id: d.donor_id,
            name: d.name ?? "Unknown",
            lat: d.lng, // Note: backend has lat/lng swapped, so use lng for latitude
            lng: d.lat, // and lat for longitude
            blood: d.blood_type ?? "Unknown",
            distance: typeof d.distance_km === "number" ? d.distance_km : (d.distance_meters ? d.distance_meters / 1000 : 0),
            location: d.location_name ?? "",
            isAvailable: d.is_available ?? false,
            lastDonation: d.last_donation_date,
            totalDonations: d.total_donations ?? 0,
            phone: d.phone ?? "",
            email: d.email ?? "",
            city: d.city ?? "",
            state: d.state ?? "",
            country: d.country ?? "",
              }))
          : [];

          console.log(res.data)

          console.log(donors)

        setNearby(donors);
      } catch (err) {
        console.error("Error fetching donors:", err);
        setNearby([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div>
      {loading && <p>Loading nearby donors...</p>}
      <MapContainer
        center={patientPos}
        zoom={14}
        style={{ height: "500px", width: "100%" }}
      >
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
        {nearby.length === 0 && !loading && (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            No donors found nearby.
          </p>
        )}

        {nearby.map((d) => (
          <Marker key={d.id} position={[d.lat, d.lng]} icon={donorIcon}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <h3>🧑 {d.name}</h3>
                <p>
                  🩸 Blood Group: <b>{d.blood}</b>
                </p>
                <p>📍 Distance: {d.distance.toFixed(2)} km</p>
                <button
                  style={{
                    background: "#e63946",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Request Donation
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
