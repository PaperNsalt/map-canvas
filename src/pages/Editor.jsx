import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import EditorBottomToolbar from "../components/EditorBottomToolbar";
import EditorMapPreview from "../components/EditorMapPreview";
import EditorSidebar from "../components/EditorSidebar";
import {
  initialState,
  locationPresets,
  mapStyles,
  themePresets,
} from "../data/editorConfig";
import "leaflet/dist/leaflet.css";

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

      let imageData = "";

      try {
        const canvas = await html2canvas(previewRef.current, {
          useCORS: true,
          allowTaint: false,
          backgroundColor,
          scale: 2,
        });
        imageData = canvas.toDataURL("image/png");
      } catch {
        imageData = await toPng(previewRef.current, {
          cacheBust: true,
          backgroundColor,
          pixelRatio: 2,
        });
      }

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
      setSearchFeedback(`Preview downloaded as ${format.toUpperCase()}.`);
    } catch {
      setSearchFeedback("Preview export failed. Try another map style or search again.");
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
    <main className="pb-56 pt-24 md:pb-48 md:pt-28">
      <section className="rounded-[2rem] border border-gray-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,244,238,0.96))] p-3 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,_rgba(14,14,14,0.98),_rgba(24,24,24,0.98))] md:rounded-[2.5rem] md:p-8">
        <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-6">
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

          <EditorMapPreview
            previewRef={previewRef}
            previewSizeClass={previewSizeClass}
            previewStyle={previewStyle}
            mapHeightClass={mapHeightClass}
            mapSurfaceStyle={mapSurfaceStyle}
            hasActiveLocation={hasActiveLocation}
            mapCenter={mapCenter}
            zoom={zoom}
            tileConfig={tileConfig}
            onViewChange={({ center, zoom: nextZoom }) => {
              setMapCenter(center);
              setZoom(nextZoom);
            }}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            mapTintStyle={mapTintStyle}
            showTitle={showTitle}
            selectedTheme={selectedTheme}
            accentColor={accentColor}
            title={title}
            subtitle={subtitle}
            showCoordinates={showCoordinates}
            selectedMapStyle={selectedMapStyle}
            posterSize={posterSize}
            orientation={orientation}
            selectedLocationLabel={selectedLocationLabel}
            textPanelStyle={textPanelStyle}
          />
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
