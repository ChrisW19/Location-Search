import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { Place } from "../api/Place";

interface MapProps {
    place: Place | null;
}

// RecenterButton inside the MapContainer
function RecenterButton({ place }: { place: Place | null }) {
    const map = useMap();  // Get access to the map instance

    const handleRecenter = () => {
        if (place) {
            map.flyTo([place.latitude, place.longitude], 14);
        }
    };

    return (
        <button
            onClick={handleRecenter}
            className="position: absolute top-3 right-3 p-3 bg-white rounded-none border-2 border-gray-400 hover:border-gray-600 cursor-pointer"
            style={{
                zIndex: 1000,
            }}
        >
            Recenter Map
        </button>
    );
}

export default function Map({ place }: MapProps) {
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        if (mapRef.current && place) {
            mapRef.current.flyTo([place.latitude, place.longitude]);
        }
    }, [place]);

    return (
            <MapContainer
                ref={mapRef}
                center={[40.7, -74]} // Default center coordinates
                zoom={12}
                scrollWheelZoom
                className="h-full"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {place && (
                    <Marker position={[place.latitude, place.longitude]}>
                        <Popup>{place.name}</Popup>
                    </Marker>
                )}
                {place && <RecenterButton place={place} />}
            </MapContainer>

    );
}
