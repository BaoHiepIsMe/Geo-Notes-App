// src/components/GeoMap.tsx

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { GeoNote } from '../type';

// **FIX LỖI LEAFLET ICONS THIẾU TRÊN REACT-LEAFLET**
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component điều chỉnh tầm nhìn của bản đồ khi có ghi chú mới
const MapViewUpdater = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const GeoMap: React.FC<{ notes: GeoNote[] }> = ({ notes }) => {
  const latestNote = notes[0];
  const defaultCenter: [number, number] = [16.0544, 108.2022]; // Mặc định: Đà Nẵng
  
  const mapCenter: [number, number] = useMemo(() => {
    return latestNote ? [latestNote.latitude, latestNote.longitude] : defaultCenter;
  }, [latestNote]);

  return (
    <div style={{ height: '500px', width: '100%', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }} 
          scrollWheelZoom={true}
        >
            {/* Cập nhật tâm bản đồ khi có ghi chú mới */}
            <MapViewUpdater center={mapCenter} zoom={13} /> 
            
            <TileLayer
                attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {notes.map(note => (
                <Marker key={note.id} position={[note.latitude, note.longitude]}>
                    <Popup>
                        <strong>{note.text}</strong> <br />
                        Tọa độ: {note.latitude.toFixed(4)}, {note.longitude.toFixed(4)}
                        
                        {/* Yêu cầu mở rộng: Mở Google Maps để dẫn đường */}
                        <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${note.latitude},${note.longitude}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ display: 'block', marginTop: '5px', color: '#007bff' }}
                        >
                            🚗 Dẫn đường
                        </a>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
  );
};

export default GeoMap;