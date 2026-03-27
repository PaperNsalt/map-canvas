import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mapStyles = [
  {
    id: "light",
    name: "Light",
    previewClass:
      "bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)] before:bg-white/80 after:bg-slate-300",
  },
  {
    id: "dark",
    name: "Dark",
    previewClass:
      "bg-[linear-gradient(135deg,#0f172a,#334155)] before:bg-slate-500/40 after:bg-slate-200/60",
  },
  {
    id: "minimal",
    name: "Minimal",
    previewClass:
      "bg-[linear-gradient(135deg,#fafaf9,#e7e5e4)] before:bg-stone-200/80 after:bg-stone-400/70",
  },
  {
    id: "satellite",
    name: "Satellite",
    previewClass:
      "bg-[linear-gradient(135deg,#365314,#1f2937)] before:bg-emerald-600/35 after:bg-amber-200/60",
  },
];

const themePresets = [
  {
    id: "modern",
    name: "Modern",
    posterBackground: "#f8fafc",
    posterBorder: "#cbd5e1",
    panelBackground: "rgba(255,255,255,0.88)",
    ink: "#0f172a",
    secondaryInk: "#475569",
    accent: "#2563eb",
    marker: "#2563eb",
    primaryColor: "#2563eb",
    backgroundColor: "#f8fafc",
    accentColor: "#f97316",
    mapFilter: "saturate(1.05) contrast(1.05)",
  },
  {
    id: "vintage",
    name: "Vintage",
    posterBackground: "#f4e7d7",
    posterBorder: "#caa989",
    panelBackground: "rgba(255,248,240,0.88)",
    ink: "#3f2a1d",
    secondaryInk: "#7a5c49",
    accent: "#b45309",
    marker: "#b45309",
    primaryColor: "#9a3412",
    backgroundColor: "#f4e7d7",
    accentColor: "#d97706",
    mapFilter:
      "sepia(0.35) saturate(0.9) contrast(0.96) brightness(1.02) hue-rotate(-10deg)",
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    posterBackground: "#0f172a",
    posterBorder: "#334155",
    panelBackground: "rgba(15,23,42,0.84)",
    ink: "#f8fafc",
    secondaryInk: "#cbd5e1",
    accent: "#38bdf8",
    marker: "#38bdf8",
    primaryColor: "#38bdf8",
    backgroundColor: "#0f172a",
    accentColor: "#a855f7",
    mapFilter: "invert(1) hue-rotate(180deg) saturate(0.55) contrast(1.1)",
  },
  {
    id: "pastel",
    name: "Pastel",
    posterBackground: "#fdf2f8",
    posterBorder: "#f9a8d4",
    panelBackground: "rgba(255,255,255,0.86)",
    ink: "#4a044e",
    secondaryInk: "#86198f",
    accent: "#ec4899",
    marker: "#ec4899",
    primaryColor: "#ec4899",
    backgroundColor: "#fdf2f8",
    accentColor: "#8b5cf6",
    mapFilter:
      "saturate(0.9) contrast(0.98) brightness(1.04) hue-rotate(8deg)",
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

const initialState = {
  selectedMapStyleId: "light",
  selectedThemeId: "modern",
  mapCenter: [14.5995, 120.9842],
  zoom: 13,
  title: "A Place Worth Remembering",
  subtitle: "Manila, Philippines",
  searchQuery: "",
  selectedLocationLabel: "Manila, Philippines",
  showCoordinates: true,
  showPlaceNames: true,
  posterSize: "a4",
  orientation: "portrait",
  primaryColor: "#2563eb",
  backgroundColor: "#f8fafc",
  accentColor: "#f97316",
};

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

function SidebarSection({ title, children }) {
  return (
    <section className="rounded-[1.6rem] border border-gray-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-sm font-semibold tracking-[0.04em] text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function MapStyleCard({ style, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(style.id)}
      className={`rounded-[1.35rem] border p-3 text-left transition ${
        selected
          ? "border-[#FF9B42] bg-[#FF9B42]/10"
          : "border-gray-200 bg-white hover:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <div
        className={`relative h-16 overflow-hidden rounded-[1rem] ${style.previewClass} before:absolute before:inset-x-3 before:top-3 before:h-7 before:rounded-full after:absolute after:inset-x-6 after:bottom-3 after:h-1 after:rounded-full`}
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold">{style.name}</span>
        <span
          className={`size-3 rounded-full ${
            selected ? "bg-[#FF9B42]" : "bg-gray-300 dark:bg-gray-600"
          }`}
        />
      </div>
    </button>
  );
}

function ThemeCard({ theme, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(theme)}
      className={`rounded-[1.35rem] border p-3 text-left transition ${
        selected
          ? "border-[#FF9B42] bg-[#FF9B42]/10"
          : "border-gray-200 bg-white hover:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <div className="flex gap-2">
        <span
          className="h-10 flex-1 rounded-xl border border-black/10"
          style={{ backgroundColor: theme.posterBackground }}
        />
        <span
          className="h-10 flex-1 rounded-xl border border-black/10"
          style={{ backgroundColor: theme.primaryColor }}
        />
        <span
          className="h-10 flex-1 rounded-xl border border-black/10"
          style={{ backgroundColor: theme.accentColor }}
        />
      </div>
      <p className="mt-3 text-sm font-semibold">{theme.name}</p>
    </button>
  );
}

function EditorPage() {
  const previewRef = useRef(null);
  const [selectedMapStyleId, setSelectedMapStyleId] = useState(initialState.selectedMapStyleId);
  const [selectedThemeId, setSelectedThemeId] = useState(initialState.selectedThemeId);
  const [mapCenter, setMapCenter] = useState(initialState.mapCenter);
  const [zoom, setZoom] = useState(initialState.zoom);
  const [title, setTitle] = useState(initialState.title);
  const [subtitle, setSubtitle] = useState(initialState.subtitle);
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery);
  const [selectedLocationLabel, setSelectedLocationLabel] = useState(
    initialState.selectedLocationLabel
  );
  const [showCoordinates, setShowCoordinates] = useState(initialState.showCoordinates);
  const [showPlaceNames, setShowPlaceNames] = useState(initialState.showPlaceNames);
  const [posterSize, setPosterSize] = useState(initialState.posterSize);
  const [orientation, setOrientation] = useState(initialState.orientation);
  const [primaryColor, setPrimaryColor] = useState(initialState.primaryColor);
  const [backgroundColor, setBackgroundColor] = useState(initialState.backgroundColor);
  const [accentColor, setAccentColor] = useState(initialState.accentColor);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const selectedTheme = useMemo(
    () => themePresets.find((theme) => theme.id === selectedThemeId) ?? themePresets[0],
    [selectedThemeId]
  );

  const selectedMapStyle = useMemo(
    () => mapStyles.find((style) => style.id === selectedMapStyleId) ?? mapStyles[0],
    [selectedMapStyleId]
  );

  const tileConfig = useMemo(() => {
    if (selectedMapStyle.id === "satellite") {
      return {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri",
      };
    }

    if (selectedMapStyle.id === "dark") {
      return showPlaceNames
        ? {
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
          }
        : {
            url: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
          };
    }

    if (selectedMapStyle.id === "minimal") {
      return {
        url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      };
    }

    return showPlaceNames
      ? {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: "&copy; OpenStreetMap contributors",
        }
      : {
          url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
          attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
        };
  }, [selectedMapStyle.id, showPlaceNames]);

  const previewSizeClass = useMemo(() => {
    if (posterSize === "square") {
      return "max-w-[700px]";
    }

    if (posterSize === "custom") {
      return orientation === "landscape" ? "max-w-[900px]" : "max-w-[620px]";
    }

    return orientation === "landscape" ? "max-w-[960px]" : "max-w-[620px]";
  }, [orientation, posterSize]);

  const mapHeightClass = useMemo(() => {
    if (posterSize === "square") {
      return "h-[520px]";
    }

    return orientation === "landscape" ? "h-[400px]" : "h-[520px]";
  }, [orientation, posterSize]);

  const previewStyle = {
    backgroundColor,
    borderColor: selectedTheme.posterBorder,
    color: selectedTheme.ink,
  };

  const textPanelStyle = {
    backgroundColor: selectedTheme.panelBackground,
    color: selectedTheme.ink,
  };

  const mapSurfaceStyle = {
    filter: selectedTheme.mapFilter,
  };

  const mapTintStyle = {
    background:
      selectedMapStyle.id === "satellite"
        ? "transparent"
        : `linear-gradient(135deg, ${backgroundColor}55, ${accentColor}22)`,
    mixBlendMode: selectedMapStyle.id === "dark" ? "screen" : "multiply",
  };

  const applyTheme = (theme) => {
    setSelectedThemeId(theme.id);
    setPrimaryColor(theme.primaryColor);
    setBackgroundColor(theme.backgroundColor);
    setAccentColor(theme.accentColor);
  };

  const handleLocationPreset = (preset) => {
    setMapCenter(preset.center);
    setZoom(preset.zoom);
    setTitle(preset.title);
    setSubtitle(preset.subtitle);
    setSelectedLocationLabel(`${preset.title}, ${preset.subtitle}`);
    setSearchFeedback(`Showing ${preset.title}, ${preset.subtitle}.`);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) {
      setSearchFeedback("Enter a city, landmark, or address to search.");
      return;
    }

    try {
      setIsSearching(true);
      setSearchFeedback("Searching location...");

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Search request failed.");
      }

      const results = await response.json();
      const match = results[0];

      if (!match) {
        setSearchFeedback("No matching location found.");
        return;
      }

      const latitude = Number.parseFloat(match.lat);
      const longitude = Number.parseFloat(match.lon);
      const labelParts = String(match.display_name)
        .split(",")
        .map((part) => part.trim());

      setMapCenter([latitude, longitude]);
      setZoom(13);
      setTitle(labelParts[0] || query);
      setSubtitle(labelParts.slice(1, 3).join(", ") || "Selected location");
      setSelectedLocationLabel(match.display_name);
      setSearchFeedback(`Showing ${match.display_name}.`);
    } catch {
      setSearchFeedback("Location search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const exportPreview = async (format = "png") => {
    if (!previewRef.current) {
      return;
    }

    try {
      setIsExporting(true);

      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        backgroundColor,
        scale: 2,
      });

      const imageData = canvas.toDataURL("image/png");
      const fileBaseName = (title || "map-canvas-poster")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      if (format === "pdf") {
        const pdf = new jsPDF({
          orientation: canvas.width >= canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileBaseName || "map-canvas-poster"}.pdf`);
        return;
      }

      const link = document.createElement("a");
      link.href = imageData;
      link.download = `${fileBaseName || "map-canvas-poster"}.png`;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const saveDesign = () => {
    const design = {
      selectedMapStyleId,
      selectedThemeId,
      mapCenter,
      zoom,
      title,
      subtitle,
      searchQuery,
      selectedLocationLabel,
      showCoordinates,
      showPlaceNames,
      posterSize,
      orientation,
      primaryColor,
      backgroundColor,
      accentColor,
    };

    localStorage.setItem("map-canvas-design", JSON.stringify(design));
    setSearchFeedback("Design saved locally.");
  };

  const resetDesign = () => {
    setSelectedMapStyleId(initialState.selectedMapStyleId);
    setSelectedThemeId(initialState.selectedThemeId);
    setMapCenter(initialState.mapCenter);
    setZoom(initialState.zoom);
    setTitle(initialState.title);
    setSubtitle(initialState.subtitle);
    setSearchQuery(initialState.searchQuery);
    setSelectedLocationLabel(initialState.selectedLocationLabel);
    setShowCoordinates(initialState.showCoordinates);
    setShowPlaceNames(initialState.showPlaceNames);
    setPosterSize(initialState.posterSize);
    setOrientation(initialState.orientation);
    setPrimaryColor(initialState.primaryColor);
    setBackgroundColor(initialState.backgroundColor);
    setAccentColor(initialState.accentColor);
    setSearchFeedback("Design reset to defaults.");
  };

  return (
    <main className="pb-16 pt-28">
      <section className="rounded-[2.5rem] border border-gray-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,244,238,0.96))] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,_rgba(14,14,14,0.98),_rgba(24,24,24,0.98))] md:p-8">
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="max-h-[calc(100vh-8rem)] space-y-4 overflow-y-auto rounded-[2rem] border border-gray-200/80 bg-white/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
                  Customize Your Map
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  Shape the location, look, and poster details from this left panel.
                </p>
              </div>

              <SidebarSection title="A. Location">
                <div>
                  <ControlLabel>Search</ControlLabel>
                  <form onSubmit={handleSearch} className="mt-3 space-y-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search for a location..."
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-[#FFB36E]"
                    >
                      {isSearching ? "Searching..." : "Set Location"}
                    </button>
                  </form>
                </div>
                <div>
                  <ControlLabel>Selected Location</ControlLabel>
                  <div className="mt-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                    {selectedLocationLabel}
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {searchFeedback || "Search a city, street, or landmark to place the map."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
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
              </SidebarSection>

              <SidebarSection title="B. Map Style">
                <div className="grid grid-cols-2 gap-3">
                  {mapStyles.map((style) => (
                    <MapStyleCard
                      key={style.id}
                      style={style}
                      selected={selectedMapStyleId === style.id}
                      onSelect={setSelectedMapStyleId}
                    />
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="C. Theme Presets">
                <div className="grid grid-cols-2 gap-3">
                  {themePresets.map((theme) => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      selected={selectedThemeId === theme.id}
                      onSelect={applyTheme}
                    />
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="D. Colors">
                <div className="grid gap-3">
                  <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <span className="text-sm font-semibold">Primary color</span>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(event) => setPrimaryColor(event.target.value)}
                      className="h-9 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                  </label>
                  <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <span className="text-sm font-semibold">Background color</span>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(event) => setBackgroundColor(event.target.value)}
                      className="h-9 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                  </label>
                  <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <span className="text-sm font-semibold">Accent color</span>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(event) => setAccentColor(event.target.value)}
                      className="h-9 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                  </label>
                </div>
              </SidebarSection>

              <SidebarSection title="E. Text & Labels">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Title"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                  />
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                    placeholder="Subtitle"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
                  />
                </div>
                <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold dark:border-white/10 dark:bg-white/5">
                  Show Coordinates
                  <input
                    type="checkbox"
                    checked={showCoordinates}
                    onChange={() => setShowCoordinates((current) => !current)}
                    className="size-4 accent-[#FF9B42]"
                  />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold dark:border-white/10 dark:bg-white/5">
                  Show Place Names
                  <input
                    type="checkbox"
                    checked={showPlaceNames}
                    onChange={() => setShowPlaceNames((current) => !current)}
                    className="size-4 accent-[#FF9B42]"
                  />
                </label>
              </SidebarSection>

              <SidebarSection title="F. Layout">
                <div>
                  <ControlLabel>Poster Size</ControlLabel>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {["a4", "square", "custom"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPosterSize(size)}
                        className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                          posterSize === size
                            ? "border-[#FF9B42] bg-[#FF9B42]/10 text-[#C76614] dark:text-[#FFB36E]"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#FF9B42] dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                        }`}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <ControlLabel>Orientation</ControlLabel>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["portrait", "landscape"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setOrientation(option)}
                        className={`rounded-2xl border px-3 py-3 text-sm font-semibold capitalize transition ${
                          orientation === option
                            ? "border-[#FF9B42] bg-[#FF9B42]/10 text-[#C76614] dark:text-[#FFB36E]"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#FF9B42] dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </SidebarSection>

              <SidebarSection title="G. Zoom & Position">
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
                <button
                  type="button"
                  onClick={() => setMapCenter(initialState.mapCenter)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                >
                  Center Map
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Drag map to adjust position
                </p>
              </SidebarSection>

              <SidebarSection title="H. Actions">
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={saveDesign}
                    className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E]"
                  >
                    Save Design
                  </button>
                  <button
                    type="button"
                    onClick={resetDesign}
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => exportPreview("png")}
                    disabled={isExporting}
                    className="rounded-2xl bg-[#FF9B42] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#C76614] hover:text-white disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#FFB36E] dark:hover:bg-[#C76614] dark:hover:text-white"
                  >
                    {isExporting ? "Preparing..." : "Download Preview"}
                  </button>
                  <button
                    type="button"
                    onClick={() => exportPreview("pdf")}
                    disabled={isExporting}
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                  >
                    Save as PDF
                  </button>
                </div>
              </SidebarSection>
            </div>
          </aside>

          <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center rounded-[2rem] border border-gray-200/80 bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.16),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(245,240,234,0.96))] p-4 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.12),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] md:p-8">
            <div
              ref={previewRef}
              className={`mx-auto w-full ${previewSizeClass} rounded-[2.2rem] border p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] md:p-5`}
              style={previewStyle}
            >
              <div className="overflow-hidden rounded-[1.7rem] border border-black/10">
                <div
                  className={`relative w-full overflow-hidden ${mapHeightClass}`}
                  style={mapSurfaceStyle}
                >
                  <MapContainer
                    center={mapCenter}
                    zoom={zoom}
                    zoomControl={false}
                    attributionControl={false}
                    className="h-full w-full"
                  >
                    <TileLayer url={tileConfig.url} attribution={tileConfig.attribution} />
                    <MapViewportController
                      center={mapCenter}
                      zoom={zoom}
                      onViewChange={({ center, zoom: nextZoom }) => {
                        setMapCenter(center);
                        setZoom(nextZoom);
                      }}
                    />
                    <CircleMarker
                      center={mapCenter}
                      radius={9}
                      pathOptions={{
                        color: backgroundColor,
                        fillColor: primaryColor,
                        fillOpacity: 1,
                        weight: 3,
                      }}
                    />
                  </MapContainer>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={mapTintStyle}
                  />
                </div>

                <div className="border-t border-black/10 p-6 md:p-8" style={textPanelStyle}>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.36em]"
                    style={{ color: accentColor }}
                  >
                    {selectedTheme.name} poster
                  </p>
                  <h1
                    className="mt-4 text-4xl leading-tight md:text-5xl"
                    style={{ fontFamily: "'Playfair Display', 'serif'" }}
                  >
                    {title || "Untitled location"}
                  </h1>
                  <p
                    className="mt-3 text-base md:text-lg"
                    style={{ color: selectedTheme.secondaryInk }}
                  >
                    {subtitle || "Add a subtitle"}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                    {showCoordinates ? (
                      <span
                        className="rounded-full px-3 py-1"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          color: accentColor,
                        }}
                      >
                        {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}
                      </span>
                    ) : null}
                    <span style={{ color: selectedTheme.secondaryInk }}>
                      {selectedMapStyle.name}
                    </span>
                    <span style={{ color: selectedTheme.secondaryInk }}>
                      {posterSize.toUpperCase()} {orientation}
                    </span>
                  </div>
                  <p
                    className="mt-5 text-sm leading-7 md:text-base"
                    style={{ color: selectedTheme.secondaryInk }}
                  >
                    {selectedLocationLabel}
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
