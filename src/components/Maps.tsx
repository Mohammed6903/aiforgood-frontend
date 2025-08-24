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
  const [patientPos, setPatientPos] = useState<[number, number] | null>(null);
  const [nearby, setNearby] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get location from browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPatientPos([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
          // fallback to Fairfield by Mariott
          setPatientPos([17.42424, 78.34750]);
        }
      );
    } else {
      setPatientPos([17.42424, 78.34750]);
    }
  }, []);

  useEffect(() => {
    if (!patientPos) return;
    const fetchDonors = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/donors/nearby-donors`,
          {
            lng: patientPos[0],
            lat: patientPos[1],
            radius: 10000,
          }
        );
        const donors = Array.isArray(res.data)
          ? res.data
              .filter((d: any) => typeof d.lat === "number" && typeof d.lng === "number")
              .map((d: any) => ({
                id: d.donor_id,
                name: d.name ?? "Unknown",
                lat: d.lat,
                lng: d.lng,
                blood: d.blood_type ?? "Unknown",
                distance: typeof d.distance_km === "number" ? d.distance_km : (d.distance_meters ? d.distance_meters / 1000 : 0),
                location: d.location_name ?? "",
                phone: d.phone ?? "",
                email: d.email ?? "",
                city: d.city ?? "",
                state: d.state ?? "",
                country: d.country ?? "",
              }))
          : [];
        setNearby(donors);
      } catch (err) {
        console.error("Error fetching donors:", err);
        setNearby([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, [patientPos]);

  return (
    <div>
      {loading && <p>Loading nearby donors...</p>}
      {patientPos && (
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
          <Circle center={patientPos} radius={200} color="blue" />

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
      )}
      {!patientPos && !loading && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Unable to get your location.
        </p>
      )}
    </div>
  );
}
