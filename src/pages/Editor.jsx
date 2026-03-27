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
import EditorBottomToolbar from "../components/EditorBottomToolbar";
import EditorSidebar from "../components/EditorSidebar";
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
  title: "",
  subtitle: "",
  searchQuery: "",
  selectedLocationLabel: "",
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
  const [showTitle, setShowTitle] = useState(true);
  const [hasActiveLocation, setHasActiveLocation] = useState(false);
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
    setHasActiveLocation(true);
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
      setHasActiveLocation(true);
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
      showTitle,
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
    setShowTitle(true);
    setHasActiveLocation(false);
    setShowCoordinates(initialState.showCoordinates);
    setShowPlaceNames(initialState.showPlaceNames);
    setPosterSize(initialState.posterSize);
    setOrientation(initialState.orientation);
    setPrimaryColor(initialState.primaryColor);
    setBackgroundColor(initialState.backgroundColor);
    setAccentColor(initialState.accentColor);
    setSearchFeedback("Design reset to defaults.");
  };

  const resetPosition = () => {
    setMapCenter(initialState.mapCenter);
    setZoom(initialState.zoom);
    setSearchFeedback("Map position reset.");
  };

  return (
    <main className="pb-44 pt-28">
      <section className="rounded-[2.5rem] border border-gray-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,244,238,0.96))] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,_rgba(14,14,14,0.98),_rgba(24,24,24,0.98))] md:p-8">
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <EditorSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isSearching={isSearching}
            selectedLocationLabel={selectedLocationLabel}
            searchFeedback={searchFeedback}
            locationPresets={locationPresets}
            handleLocationPreset={handleLocationPreset}
            mapStyles={mapStyles}
            selectedMapStyleId={selectedMapStyleId}
            setSelectedMapStyleId={setSelectedMapStyleId}
            themePresets={themePresets}
            selectedThemeId={selectedThemeId}
            applyTheme={applyTheme}
            primaryColor={primaryColor}
            setPrimaryColor={setPrimaryColor}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            showTitle={showTitle}
            setShowTitle={setShowTitle}
            showCoordinates={showCoordinates}
            setShowCoordinates={setShowCoordinates}
            showPlaceNames={showPlaceNames}
            setShowPlaceNames={setShowPlaceNames}
            posterSize={posterSize}
            setPosterSize={setPosterSize}
            orientation={orientation}
            setOrientation={setOrientation}
            zoom={zoom}
            setZoom={setZoom}
            centerMap={() => setMapCenter(initialState.mapCenter)}
            saveDesign={saveDesign}
            resetDesign={resetDesign}
            exportPreview={exportPreview}
            isExporting={isExporting}
          />

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
                  {hasActiveLocation ? (
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
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_30%),linear-gradient(160deg,_rgba(248,250,252,0.98),_rgba(226,232,240,0.9))] p-8 text-center dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(160deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.92))]">
                      <div className="max-w-md">
                        <p
                          className="text-xs font-semibold uppercase tracking-[0.34em]"
                          style={{ color: accentColor }}
                        >
                          Live Map Preview
                        </p>
                        <h2
                          className="mt-5 text-3xl leading-tight"
                          style={{ fontFamily: "'Playfair Display', 'serif'" }}
                        >
                          Start by searching for a location to create your custom map poster.
                        </h2>
                      </div>
                    </div>
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={mapTintStyle}
                  />
                  {showTitle && hasActiveLocation ? (
                    <div className="pointer-events-none absolute inset-x-6 top-6 z-[500]">
                      <div
                        className="mx-auto max-w-xl rounded-[1.6rem] border border-white/20 px-6 py-5 text-center shadow-[0_20px_50px_rgba(15,23,42,0.18)] backdrop-blur-md"
                        style={{
                          backgroundColor: `${selectedTheme.panelBackground}`,
                          color: selectedTheme.ink,
                        }}
                      >
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.4em]"
                          style={{ color: accentColor }}
                        >
                          Custom Map Poster
                        </p>
                        <h1
                          className="mt-3 text-3xl leading-tight md:text-4xl"
                          style={{ fontFamily: "'Playfair Display', 'serif'" }}
                        >
                          {title || "Untitled location"}
                        </h1>
                        {subtitle ? (
                          <p
                            className="mt-2 text-sm md:text-base"
                            style={{ color: selectedTheme.secondaryInk }}
                          >
                            {subtitle}
                          </p>
                        ) : null}
                        {showCoordinates ? (
                          <p
                            className="mt-4 text-xs font-semibold uppercase tracking-[0.28em]"
                            style={{ color: accentColor }}
                          >
                            {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-black/10 p-6 md:p-8" style={textPanelStyle}>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.36em]"
                    style={{ color: accentColor }}
                  >
                    {selectedTheme.name} poster
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
                    {selectedLocationLabel || "Choose a location to begin your poster preview."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorBottomToolbar
        setZoom={setZoom}
        mapStyles={mapStyles}
        selectedMapStyleId={selectedMapStyleId}
        setSelectedMapStyleId={setSelectedMapStyleId}
        resetPosition={resetPosition}
        centerMap={() => setMapCenter(initialState.mapCenter)}
        showTitle={showTitle}
        setShowTitle={setShowTitle}
        showCoordinates={showCoordinates}
        setShowCoordinates={setShowCoordinates}
        exportPreview={exportPreview}
        isExporting={isExporting}
        saveDesign={saveDesign}
      />
    </main>
  );
}

export default EditorPage;
