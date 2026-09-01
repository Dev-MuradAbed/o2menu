// components/MapComponent.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent() {

  const branch1: [number, number] = [31.452689913178727, 34.385889589214344];
  const branch2: [number, number] = [31.526860159438765, 34.450683896719];

  return (
    <MapContainer
      center={branch1}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", filter: "invert(90%) hue-rotate(180deg)" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={branch1} icon={customIcon}><Popup>فرع الوسطى</Popup></Marker>
      <Marker position={branch2} icon={customIcon}><Popup>فرع غزة</Popup></Marker>
    </MapContainer>
  );
}