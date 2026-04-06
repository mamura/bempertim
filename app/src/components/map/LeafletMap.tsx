"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { MapBusiness } from "@/lib/map-businesses";

type Props = {
  center: [number, number];
  businesses: MapBusiness[];
};

const bemPertimIcon = L.icon({
  iconUrl: "/bem-pertim-icon.svg",
  iconSize: [56, 56],
  iconAnchor: [28, 56],
  popupAnchor: [0, -52],
});

export default function LeafletMap({ center, businesses }: Props) {
  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {businesses.map((business) => (
        <Marker
          key={business.id}
          position={[business.latitude, business.longitude]}
          icon={bemPertimIcon}
        >
          <Popup>
            <strong>{business.name}</strong>
            <br />
            {business.category}
            <br />
            {business.phone}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}