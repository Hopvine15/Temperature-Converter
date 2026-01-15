import { Tile } from "@carbon/react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
  
interface MapCardProps {
  lat?: number;
  lon?: number;
  locationName?: string;
  countryName?: string;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function MapCard({ lat, lon, locationName, countryName }: MapCardProps) {
  const hasLocation = lat !== undefined && lon !== undefined;
  const locationLabel = locationName
    ? `${locationName}${countryName ? `, ${countryName}` : ""}`
    : "Selected location";
  const mapZoom = 2.5;
  const formatCoordinate = (value: number) => Math.abs(value).toFixed(4);
  const latDirection = lat !== undefined && lat >= 0 ? "North" : "South";
  const lonDirection = lon !== undefined && lon >= 0 ? "East" : "West";

  return (
    <div className="bg-white border border-carbon-gray-20 w-full lg:w-140 h-full flex flex-col">
      <div className="border-b border-carbon-gray-20 px-6 py-4">
        <h2 className="text-carbon-gray-100 text-lg m-0">Location</h2>
      </div>

      <div className="p-6 space-y-3">
        {/* map area */}
        <div className="aspect-4/2 min-h-40 border border-carbon-gray-20 overflow-hidden">
          {hasLocation ? (
            <MapContainer
              key={`${lat}-${lon}`}
              center={[lat!, lon!]}
              zoom={mapZoom}
              scrollWheelZoom={true}
              dragging={true}
              style={{ width: "100%", height: "100%" }}
            >
              {/* greyscale basemap */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                detectRetina
                attribution="OpenStreetMap contributors | CARTO"
              />

              <Marker position={[lat!, lon!]}>
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -12]}
                  opacity={1}
                  className="map-pin-tooltip"
                >
                  {locationLabel}
                </Tooltip>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-carbon-gray-60 bg-carbon-gray-10">
              Location map - please input a location to view
            </div>
          )}
        </div>

        {/* Text details */}
        <div className="space-y-4 text-carbon-gray-80">
          {hasLocation ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Tile className="bg-carbon-gray-10 p-4">
                  <p className="mb-1 text-xs text-carbon-gray-70">Latitude</p>
                  <p className="text-lg font-mono text-carbon-gray-100">
                    {formatCoordinate(lat!)}
                    {"\u00b0"}
                  </p>
                  <p className="mt-1 text-xs text-carbon-gray-70">
                    {latDirection}
                  </p>
                </Tile>

                <Tile className="bg-carbon-gray-10 p-4">
                  <p className="mb-1 text-xs text-carbon-gray-70">Longitude</p>
                  <p className="text-lg font-mono text-carbon-gray-100">
                    {formatCoordinate(lon!)}
                    {"\u00b0"}
                  </p>
                  <p className="mt-1 text-xs text-carbon-gray-70">
                    {lonDirection}
                  </p>
                </Tile>
              </div>
              <div className="border border-carbon-gray-20 bg-carbon-gray-20 px-3 py-2 text-xs text-carbon-gray-70">
                <span className="font-semibold text-carbon-gray-90">
                  Projection:
                </span>{" "}
                <span className="text-carbon-gray-70">
                  Geographic coordinate system displaying city location on world
                  map
                </span>
              </div>
            </>
          ) : (
            <div className="text-xs text-carbon-gray-70">
              Coordinates pending
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
