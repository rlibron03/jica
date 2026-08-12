"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const customMarkerIcon = (color: string) => L.divIcon({
  className: "custom-leaflet-marker",
  html: `
    <div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
        <path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2"/>
        <circle cx="7" cy="18" r="2"/>
        <circle cx="17" cy="18" r="2"/>
      </svg>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const trucks = [
  {
    id: "TRK-01",
    driver: "Cardo Dalisay",
    status: "Idle/Alert",
    destination: "Lapasan Highway",
    position: [8.4833, 124.6620] as [number, number],
    color: "#ef4444" // red-500
  },
  {
    id: "TRK-02",
    driver: "Pedro Penduko",
    status: "Delivering",
    destination: "Ayala Centrio",
    position: [8.4820, 124.6480] as [number, number],
    color: "#3b82f6" // blue-500
  },
  {
    id: "TRK-03",
    driver: "Juan Dela Cruz",
    status: "In Transit",
    destination: "SM Uptown",
    position: [8.4480, 124.6280] as [number, number],
    color: "#eab308" // yellow-500
  }
];

export default function LiveFleetMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-slate-100 flex items-center justify-center">Loading map...</div>;

  return (
    <MapContainer 
      center={[8.4772, 124.6459]} 
      zoom={13} 
      className="w-full h-[500px] xl:h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {trucks.map(truck => (
        <Marker 
          key={truck.id} 
          position={truck.position}
          icon={customMarkerIcon(truck.color)}
        >
          <Popup>
            <div className="flex flex-col gap-1 p-1">
              <div className="font-bold text-lg text-slate-800">{truck.id}</div>
              <div className="text-sm text-slate-600"><strong>Driver:</strong> {truck.driver}</div>
              <div className="text-sm text-slate-600"><strong>Status:</strong> <span style={{ color: truck.color, fontWeight: 'bold' }}>{truck.status}</span></div>
              <div className="text-sm text-slate-600"><strong>Location:</strong> {truck.destination}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
