import { useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const palettePresets = [
  {
    id: "warm-studio",
    name: "Warm Studio",
    posterBackground: "#f7f1e8",
    posterBorder: "#d8c7b6",
    panelBackground: "rgba(255, 255, 255, 0.86)",
    ink: "#1e1712",
    secondaryInk: "#625247",
    accent: "#c96f37",
    marker: "#c96f37",
    mapFilter:
      "sepia(0.3) saturate(0.9) contrast(1.05) brightness(1.03) hue-rotate(-10deg)",
  },
  {
    id: "midnight",
    name: "Midnight",
    posterBackground: "#10161f",
    posterBorder: "#2b394a",
    panelBackground: "rgba(10, 14, 19, 0.78)",
    ink: "#f7f2eb",
    secondaryInk: "#c5ccd7",
    accent: "#8bc6ff",
    marker: "#8bc6ff",
    mapFilter: "invert(1) hue-rotate(190deg) saturate(0.45) contrast(1.15)",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    posterBackground: "#f4e5da",
    posterBorder: "#c78769",
    panelBackground: "rgba(255, 245, 238, 0.88)",
    ink: "#2d1812",
    secondaryInk: "#6f4e42",
    accent: "#b85d37",
    marker: "#b85d37",
    mapFilter:
      "sepia(0.45) saturate(1.2) contrast(0.95) brightness(1.02) hue-rotate(-18deg)",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    posterBackground: "#e8f1f6",
    posterBorder: "#9fc3d4",
    panelBackground: "rgba(255, 255, 255, 0.82)",
    ink: "#112534",
    secondaryInk: "#4a6678",
    accent: "#1d7aa9",
    marker: "#1d7aa9",
    mapFilter:
      "saturate(0.75) contrast(1.08) brightness(1.01) hue-rotate(8deg)",
  },
];

const locationPresets = [
  {
    id: "manila",
    label: "Manila",
    center: [14.5995, 120.9842],
    zoom: 13,
    title: "Manila",
    subtitle: "Philippines",
  },
  {
    id: "new-york",
    label: "New York",
    center: [40.7128, -74.006],
    zoom: 13,
    title: "New York",
    subtitle: "United States",
  },
  {
    id: "paris",
    label: "Paris",
    center: [48.8566, 2.3522],
    zoom: 13,
    title: "Paris",
    subtitle: "France",
  },
  {
    id: "tokyo",
    label: "Tokyo",
    center: [35.6762, 139.6503],
    zoom: 13,
    title: "Tokyo",
    subtitle: "Japan",
  },
];

function MapViewportController({ center, zoom, onViewChange }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, map, zoom]);

  useMapEvents({
    moveend() {
      const nextCenter = map.getCenter();
      onViewChange({
        center: [Number(nextCenter.lat.toFixed(4)), Number(nextCenter.lng.toFixed(4))],
        zoom: map.getZoom(),
      });
    },
    zoomend() {
      const nextCenter = map.getCenter();
      onViewChange({
        center: [Number(nextCenter.lat.toFixed(4)), Number(nextCenter.lng.toFixed(4))],
        zoom: map.getZoom(),
      });
    },
  });

  return null;
}

function ControlLabel({ children }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
      {children}
    </label>
  );
}

function EditorPage() {
  const [selectedPaletteId, setSelectedPaletteId] = useState("warm-studio");
  const [mapCenter, setMapCenter] = useState([14.5995, 120.9842]);
  const [zoom, setZoom] = useState(13);
  const [title, setTitle] = useState("A Place Worth Remembering");
  const [subtitle, setSubtitle] = useState("Manila, Philippines");
  const [caption, setCaption] = useState("Where your story meets the streets.");
  const [showMarker, setShowMarker] = useState(true);

  const selectedPalette = useMemo(
    () => palettePresets.find((preset) => preset.id === selectedPaletteId) ?? palettePresets[0],
    [selectedPaletteId]
  );

  const previewStyle = {
    backgroundColor: selectedPalette.posterBackground,
    borderColor: selectedPalette.posterBorder,
    color: selectedPalette.ink,
  };

  const textPanelStyle = {
    backgroundColor: selectedPalette.panelBackground,
    color: selectedPalette.ink,
  };

  const handleLocationPreset = (preset) => {
    setMapCenter(preset.center);
    setZoom(preset.zoom);
    setTitle(preset.title);
    setSubtitle(preset.subtitle);
  };

  return (
    <main className="pb-16 pt-28">
      <section className="rounded-[2.5rem] border border-gray-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,244,238,0.96))] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,_rgba(14,14,14,0.98),_rgba(24,24,24,0.98))] md:p-8">
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-gray-200/80 bg-white/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
                Editor
              </p>
              <h1
                className="mt-3 text-3xl"
                style={{ fontFamily: "'Playfair Display', 'serif'" }}
              >
                Build your map poster
              </h1>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                Pick a location, change the palette, and add the text you want
                printed on the final design.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <ControlLabel>Location Presets</ControlLabel>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {locationPresets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleLocationPreset(preset)}
                      className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <ControlLabel>Map Center</ControlLabel>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    step="0.0001"
                    value={mapCenter[0]}
                    onChange={(event) =>
                      setMapCenter([
                        Number(event.target.value),
                        mapCenter[1],
                      ])
                    }
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                    aria-label="Latitude"
                  />
                  <input
                    type="number"
                    step="0.0001"
                    value={mapCenter[1]}
                    onChange={(event) =>
                      setMapCenter([
                        mapCenter[0],
                        Number(event.target.value),
                      ])
                    }
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                    aria-label="Longitude"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Drag the map too. These values stay in sync with the preview.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <ControlLabel>Zoom</ControlLabel>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {zoom}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="18"
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="mt-3 w-full accent-[#FF9B42]"
                />
              </div>

              <div>
                <ControlLabel>Theme</ControlLabel>
                <div className="mt-3 grid gap-2">
                  {palettePresets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPaletteId(preset.id)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                        selectedPaletteId === preset.id
                          ? "border-[#FF9B42] bg-[#FF9B42]/10"
                          : "border-gray-200 bg-white hover:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                      }`}
                    >
                      <span className="text-sm font-semibold">{preset.name}</span>
                      <span className="flex gap-2">
                        <span
                          className="size-4 rounded-full border border-black/10"
                          style={{ backgroundColor: preset.posterBackground }}
                        />
                        <span
                          className="size-4 rounded-full border border-black/10"
                          style={{ backgroundColor: preset.accent }}
                        />
                        <span
                          className="size-4 rounded-full border border-black/10"
                          style={{ backgroundColor: preset.ink }}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <ControlLabel>Poster Text</ControlLabel>
                <div className="mt-3 space-y-3">
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Main title"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                  />
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                    placeholder="Subtitle"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                  />
                  <textarea
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    placeholder="Caption or special note"
                    rows="3"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              </div>

              <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold dark:border-white/10 dark:bg-white/5">
                Highlight center point
                <input
                  type="checkbox"
                  checked={showMarker}
                  onChange={() => setShowMarker((current) => !current)}
                  className="size-4 accent-[#FF9B42]"
                />
              </label>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-gray-200/80 bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.16),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(245,240,234,0.96))] p-4 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.12),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] md:p-6">
            <div
              className="mx-auto max-w-3xl rounded-[2.2rem] border p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] md:p-5"
              style={previewStyle}
            >
              <div className="overflow-hidden rounded-[1.7rem] border border-black/10">
                <div
                  className="h-[420px] w-full"
                  style={{ filter: selectedPalette.mapFilter }}
                >
                  <MapContainer
                    center={mapCenter}
                    zoom={zoom}
                    zoomControl={false}
                    attributionControl={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <MapViewportController
                      center={mapCenter}
                      zoom={zoom}
                      onViewChange={({ center, zoom: nextZoom }) => {
                        setMapCenter(center);
                        setZoom(nextZoom);
                      }}
                    />
                    {showMarker ? (
                      <CircleMarker
                        center={mapCenter}
                        radius={9}
                        pathOptions={{
                          color: selectedPalette.posterBackground,
                          fillColor: selectedPalette.marker,
                          fillOpacity: 1,
                          weight: 3,
                        }}
                      />
                    ) : null}
                  </MapContainer>
                </div>

                <div className="border-t border-black/10 p-6 md:p-8" style={textPanelStyle}>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.36em]"
                    style={{ color: selectedPalette.accent }}
                  >
                    Custom map print
                  </p>
                  <h2
                    className="mt-4 text-4xl leading-tight md:text-5xl"
                    style={{ fontFamily: "'Playfair Display', 'serif'" }}
                  >
                    {title || "Untitled location"}
                  </h2>
                  <p
                    className="mt-3 text-base md:text-lg"
                    style={{ color: selectedPalette.secondaryInk }}
                  >
                    {subtitle || "Add a subtitle"}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                    <span
                      className="rounded-full px-3 py-1"
                      style={{
                        backgroundColor: `${selectedPalette.accent}18`,
                        color: selectedPalette.accent,
                      }}
                    >
                      {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}
                    </span>
                    <span style={{ color: selectedPalette.secondaryInk }}>
                      Zoom {zoom}
                    </span>
                  </div>
                  <p
                    className="mt-5 max-w-2xl text-sm leading-7 md:text-base"
                    style={{ color: selectedPalette.secondaryInk }}
                  >
                    {caption || "Add a meaningful note beneath the location."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EditorPage;
