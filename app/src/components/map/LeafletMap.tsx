"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { MapBusiness } from "@/lib/map-businesses";

type Props = {
  center: [number, number];
  businesses: MapBusiness[];
  userPosition?: [number, number] | null;
  recenterKey?: number;
};

const bemPertimIcon = L.icon({
  iconUrl: "/bem-pertim-icon.svg",
  iconSize: [56, 56],
  iconAnchor: [28, 56],
  popupAnchor: [0, -52],
});

function isValidLatLng(value: unknown): value is [number, number] {
  if (!Array.isArray(value) || value.length !== 2) return false;

  const [lat, lng] = value;

  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lng)
  );
}

function MapRecenter({
  target,
  recenterKey,
}: {
  target: [number, number] | null;
  recenterKey: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!isValidLatLng(target)) return;
    if (recenterKey === 0) return;

    map.whenReady(() => {
      map.setView(target, map.getZoom(), {
        animate: true,
      });
    });
  }, [map, target, recenterKey]);

  return null;
}

export default function LeafletMap({
  center,
  businesses,
  userPosition,
  recenterKey = 0,
}: Props) {
  if (!isValidLatLng(center)) {
    return <div className="bp-map-loading">Center inválido</div>;
  }

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <MapRecenter target={userPosition ?? null} recenterKey={recenterKey} />

      {isValidLatLng(userPosition) ? (
        <CircleMarker
          center={userPosition}
          radius={8}
          pathOptions={{
            color: "#ffffff",
            weight: 3,
            fillColor: "#2ca6a3",
            fillOpacity: 1,
          }}
        >
          <Popup>
            <strong>Você está aqui</strong>
          </Popup>
        </CircleMarker>
      ) : null}

      {businesses
        .filter(
          (business) =>
            Number.isFinite(business.latitude) &&
            Number.isFinite(business.longitude)
        )
        .map((business) => (
          <Marker
            key={business.id}
            position={[business.latitude, business.longitude]}
            icon={bemPertimIcon}
          >
            <Popup>
              <strong>{business.name}</strong>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}