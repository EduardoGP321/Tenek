import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Ubicacion } from "~/types";

interface EmbeddedMapProps {
    ubicaciones?: Ubicacion[];
    selectedId?: number | null;
    onSelectUbicacion?: (ubicacion: Ubicacion) => void;
    className?: string;
}

export default function EmbeddedMap({
    ubicaciones = [],
    selectedId = null,
    onSelectUbicacion,
    className = "",
}: EmbeddedMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<Map<number, any>>(new Map());
    const boundsRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !mapContainerRef.current) return;

        let isMounted = true;

        async function initMap() {
            const L = await import("leaflet");

            if (!isMounted || !mapContainerRef.current) return;

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                markersRef.current.clear();
            }

            // Centro inicial por defecto (Puebla)
            const defaultCenter: [number, number] = [19.0433, -98.2019];

            const map = L.map(mapContainerRef.current, {
                center: defaultCenter,
                zoom: 13,
                scrollWheelZoom: false,
            });
            mapInstanceRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(map);

            const bounds = L.latLngBounds([]);

            ubicaciones.forEach((ubicacion) => {
                const { lat, lng } = ubicacion.coordenadas;
                if (!lat || !lng) return;

                bounds.extend([lat, lng]);

                // Crear ícono personalizado para cada punto de venta
                const customIcon = L.divIcon({
                    className: "custom-pin-container",
                    html: `
                        <div class="relative flex items-center justify-center group cursor-pointer">
                            <div class="absolute -inset-1.5 rounded-full bg-[#a51d24]/20 animate-ping"></div>
                            <div class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#a51d24] text-white shadow-xl ring-2 ring-white transition-transform duration-200 group-hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    `,
                    iconSize: [36, 36],
                    iconAnchor: [18, 18],
                    popupAnchor: [0, -20],
                });

                const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                markersRef.current.set(ubicacion.id, marker);

                // Links de redes sociales en el popup
                const redesHtml = (ubicacion.redes_sociales || [])
                    .map(
                        (red) => `
                        <a href="${red.link}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; justify-content:center; padding: 3px 8px; border-radius: 9999px; background: #f5f5f4; color: #1c1917; font-size: 10px; font-weight: 700; text-decoration: none; text-transform: capitalize;">
                            ${red.tipo.replace('_', ' ')}
                        </a>
                    `
                    )
                    .join(" ");

                const logoHtml = ubicacion.logo_url
                    ? `<img src="${ubicacion.logo_url}" alt="${ubicacion.nombre}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; margin: 0 auto 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" />`
                    : "";

                const popupContent = `
                    <div style="font-family: inherit; padding: 6px 4px; text-align: center; min-width: 190px; max-width: 240px;">
                        ${logoHtml}
                        <h4 style="font-size: 13px; font-weight: 800; text-transform: uppercase; margin: 2px 0; color: #171717; letter-spacing: -0.02em;">
                            ${ubicacion.nombre}
                        </h4>
                        <p style="font-size: 10.5px; color: #57534e; margin: 3px 0 8px; line-height: 1.35;">
                            ${ubicacion.direccion}
                        </p>
                        ${redesHtml ? `<div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; margin-bottom: 8px;">${redesHtml}</div>` : ""}
                        <a href="${ubicacion.link_mapa}" target="_blank" rel="noopener noreferrer" style="display: inline-block; width: 100%; padding: 6px 12px; background: #a51d24; color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; border-radius: 8px; text-decoration: none; letter-spacing: 0.05em;">
                            Ver en Google Maps ↗
                        </a>
                    </div>
                `;

                marker.bindPopup(popupContent);

                marker.on("click", () => {
                    onSelectUbicacion?.(ubicacion);
                });
            });

            // Guardar los bounds y ajustar vista a todos los pines
            if (ubicaciones.length > 0 && bounds.isValid()) {
                boundsRef.current = bounds;
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
            }
        }

        initMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markersRef.current.clear();
                boundsRef.current = null;
            }
        };
    }, [ubicaciones]);

    // Responder cuando se selecciona un punto o se deselecciona (null = ver todos)
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        if (selectedId) {
            // Zoom al marcador seleccionado
            const marker = markersRef.current.get(selectedId);
            if (marker) {
                mapInstanceRef.current.flyTo(marker.getLatLng(), 16, { duration: 1 });
                marker.openPopup();
            }
        } else {
            // Resetear: cerrar popups y volver a mostrar todos los puntos
            mapInstanceRef.current.closePopup();
            if (boundsRef.current) {
                mapInstanceRef.current.flyToBounds(boundsRef.current, {
                    padding: [50, 50],
                    maxZoom: 15,
                    duration: 1.2,
                });
            }
        }
    }, [selectedId]);

    return (
        <div
            ref={mapContainerRef}
            className={`relative w-full h-full min-h-[420px] sm:min-h-[500px] z-0 [&_.leaflet-tile]:grayscale [&_.leaflet-tile]:contrast-75 [&_.leaflet-tile]:brightness-95 rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 ${className}`}
        />
    );
}