import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface EmbeddedMapProps {
    lat?: number;
    lng?: number;
    zoom?: number;
    className?: string;
    popupTitle?: string;
    popupAddress?: string;
}

export default function EmbeddedMap({
    lat = 19.0305,
    lng = -98.2045,
    zoom = 16,
    className = "",
    popupTitle = "Cervecería Tenek",
    popupAddress = "Priv. 6a Sur 2906, Ladrillera de Benítez, Puebla",
}: EmbeddedMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !mapContainerRef.current) return;

        let isMounted = true;

        async function initMap() {
            const L = await import("leaflet");

            if (!isMounted || !mapContainerRef.current) return;

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }

            const map = L.map(mapContainerRef.current, {
                center: [lat, lng],
                zoom: zoom,
                scrollWheelZoom: false,
            });
            mapInstanceRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(map);

            const customIcon = L.divIcon({
                className: "custom-pin-container",
                html: `
          <div class="relative flex items-center justify-center">
            <div class="absolute -inset-2 rounded-full bg-[#a51d24]/25 animate-ping"></div>
            <div class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#a51d24] text-white shadow-xl ring-2 ring-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        `,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -22],
            });

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

            const popupContent = `
        <div style="font-family: inherit; padding: 4px 6px; text-align: center;">
          <h4 style="font-size: 15px; font-weight: 800; text-transform: uppercase; margin: 2px 0 4px; color: #171717;">${popupTitle}</h4>
          <p style="font-size: 11px; color: #525252; margin: 0; line-height: 1.35;">${popupAddress}</p>
        </div>
      `;

            marker.bindPopup(popupContent).openPopup();
        }

        initMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lng, zoom, popupTitle, popupAddress]);

    return (
        <div
            ref={mapContainerRef}
            className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] z-0 [&_.leaflet-tile]:grayscale [&_.leaflet-tile]:contrast-75 [&_.leaflet-tile]:brightness-95 ${className}`}
        />
    );
}