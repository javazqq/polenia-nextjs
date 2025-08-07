"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./distributors-map.css";

// Fix for default markers not showing
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Distributor {
  name: string;
  location: string;
  type: string;
  contact: string;
  colorFrom: string;
  colorTo: string;
  lat: number;
  lng: number;
}

interface DistributorsMapProps {
  distributors: Distributor[];
  selectedDistributor: string | null;
  onDistributorSelect: (name: string | null) => void;
}

// Custom marker icon creator
const createCustomIcon = (
  colorFrom: string,
  colorTo: string,
  isSelected: boolean = false
) => {
  return divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: ${isSelected ? "30px" : "24px"};
        height: ${isSelected ? "30px" : "24px"};
        background: linear-gradient(45deg, ${colorFrom}, ${colorTo});
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
        transition: all 0.3s ease;
      ">
        <svg width="${isSelected ? "16" : "12"}" height="${isSelected ? "16" : "12"}" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [isSelected ? 36 : 30, isSelected ? 36 : 30],
    iconAnchor: [isSelected ? 18 : 15, isSelected ? 18 : 15],
    popupAnchor: [0, isSelected ? -18 : -15],
  });
};

// Component to handle map view changes
function MapViewController({
  selectedDistributor,
  distributors,
}: {
  selectedDistributor: string | null;
  distributors: Distributor[];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedDistributor) {
      const distributor = distributors.find(
        (d) => d.name === selectedDistributor
      );
      if (distributor && distributor.lat && distributor.lng) {
        // Pan to the selected distributor with a smooth animation
        map.flyTo([distributor.lat, distributor.lng], 17, {
          duration: 1.5, // 1.5 second animation
        });
      }
    } else {
      // Reset to Oaxaca overview when no distributor is selected
      map.flyTo([17.0732, -96.7266], 11, {
        duration: 1.5,
      });
    }
  }, [selectedDistributor, distributors, map]);

  return null;
}

export default function DistributorsMap({
  distributors,
  selectedDistributor,
  onDistributorSelect,
}: DistributorsMapProps) {
  return (
    <div className="h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-white/40">
      <MapContainer
        center={[17.0732, -96.7266]} // Center on Oaxaca, México
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Component to handle map view changes */}
        <MapViewController
          selectedDistributor={selectedDistributor}
          distributors={distributors}
        />

        {distributors
          .filter((d) => d.lat && d.lng) // Only show distributors with coordinates
          .map((distributor) => {
            const isSelected = selectedDistributor === distributor.name;
            return (
              <Marker
                key={distributor.name}
                position={[distributor.lat, distributor.lng]}
                icon={createCustomIcon(
                  distributor.colorFrom,
                  distributor.colorTo,
                  isSelected
                )}
                eventHandlers={{
                  click: () =>
                    onDistributorSelect(isSelected ? null : distributor.name),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-48">
                    <div
                      className="w-full h-2 rounded mb-3"
                      style={{
                        background: `linear-gradient(to right, ${distributor.colorFrom}, ${distributor.colorTo})`,
                      }}
                    ></div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {distributor.name}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      📍 {distributor.location}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      {distributor.type}
                    </p>
                    <p className="text-blue-600 text-sm font-medium">
                      📧 {distributor.contact}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
