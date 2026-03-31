import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { toJpeg, toPng } from "html-to-image";
import jsPDF from "jspdf";
import EditorBottomToolbar from "../components/EditorBottomToolbar";
import EditorMapPreview from "../components/EditorMapPreview";
import EditorSidebar from "../components/EditorSidebar";
import {
  readCurrentDesign,
  saveCurrentDesign,
  savePosterToGallery,
} from "../utils/galleryStorage";
import {
  initialState,
  locationPresets,
  mapStyles,
  textPlacementPresets,
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
  const [textColor, setTextColor] = useState(initialState.textColor);
  const [selectedTextPlacementId, setSelectedTextPlacementId] = useState(
    initialState.selectedTextPlacementId
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const savedDesign = readCurrentDesign();

    if (!savedDesign) {
      return;
    }

    setSelectedMapStyleId(savedDesign.selectedMapStyleId ?? initialState.selectedMapStyleId);
    setSelectedThemeId(savedDesign.selectedThemeId ?? initialState.selectedThemeId);
    setMapCenter(savedDesign.mapCenter ?? initialState.mapCenter);
    setZoom(savedDesign.zoom ?? initialState.zoom);
    setTitle(savedDesign.title ?? initialState.title);
    setSubtitle(savedDesign.subtitle ?? initialState.subtitle);
    setSearchQuery(savedDesign.searchQuery ?? initialState.searchQuery);
    setSelectedLocationLabel(
      savedDesign.selectedLocationLabel ?? initialState.selectedLocationLabel
    );
    setShowCoordinates(savedDesign.showCoordinates ?? initialState.showCoordinates);
    setShowTitle(savedDesign.showTitle ?? true);
    setShowPlaceNames(savedDesign.showPlaceNames ?? initialState.showPlaceNames);
    setPosterSize(savedDesign.posterSize ?? initialState.posterSize);
    setOrientation(savedDesign.orientation ?? initialState.orientation);
    setPrimaryColor(savedDesign.primaryColor ?? initialState.primaryColor);
    setBackgroundColor(savedDesign.backgroundColor ?? initialState.backgroundColor);
    setAccentColor(savedDesign.accentColor ?? initialState.accentColor);
    setTextColor(savedDesign.textColor ?? initialState.textColor);
    setSelectedTextPlacementId(
      savedDesign.selectedTextPlacementId ?? initialState.selectedTextPlacementId
    );
    setHasActiveLocation(Boolean(savedDesign.selectedLocationLabel || savedDesign.title));
    setSearchFeedback("Loaded your saved poster from the gallery.");
  }, []);

  const selectedTheme = useMemo(
    () => themePresets.find((theme) => theme.id === selectedThemeId) ?? themePresets[0],
    [selectedThemeId]
  );

  const selectedMapStyle = useMemo(
    () => mapStyles.find((style) => style.id === selectedMapStyleId) ?? mapStyles[0],
    [selectedMapStyleId]
  );

  const selectedTextPlacement = useMemo(
    () =>
      textPlacementPresets.find((placement) => placement.id === selectedTextPlacementId) ??
      textPlacementPresets[0],
    [selectedTextPlacementId]
  );

  const tileConfig = useMemo(() => {
    if (selectedMapStyle.id === "satellite") {
      return {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri",
      };
    }

    if (selectedMapStyle.id === "terrain") {
      return {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
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
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      };
    }

    if (selectedMapStyle.id === "voyager") {
      return showPlaceNames
        ? {
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
          }
        : {
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
          };
    }

    if (selectedMapStyle.id === "blueprint") {
      return {
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      };
    }

    return showPlaceNames
      ? {
          url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
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
    filter:
      selectedMapStyle.id === "minimal"
        ? `${selectedTheme.mapFilter} grayscale(0.4) contrast(1.16) brightness(1.06) saturate(0.72)`
        : selectedMapStyle.id === "blueprint"
          ? `${selectedTheme.mapFilter} grayscale(0.18) contrast(1.3) saturate(0.9) brightness(0.9) hue-rotate(175deg)`
          : selectedTheme.mapFilter,
  };

  const mapTintStyle = {
    background:
      selectedMapStyle.id === "satellite"
        ? "transparent"
        : selectedMapStyle.id === "blueprint"
          ? "linear-gradient(135deg, rgba(8, 47, 73, 0.54), rgba(29, 78, 216, 0.34) 48%, rgba(186, 230, 253, 0.12))"
          : selectedMapStyle.id === "minimal"
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(120, 113, 108, 0.02))"
        : `linear-gradient(135deg, ${backgroundColor}55, ${accentColor}22)`,
    mixBlendMode:
      selectedMapStyle.id === "dark"
        ? "screen"
        : selectedMapStyle.id === "blueprint"
          ? "multiply"
          : "multiply",
  };

  const applyTheme = (theme) => {
    setSelectedThemeId(theme.id);
    setPrimaryColor(theme.primaryColor);
    setBackgroundColor(theme.backgroundColor);
    setAccentColor(theme.accentColor);
    setTextColor(theme.textColor ?? "#ffffff");
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
      let exportWidth = 0;
      let exportHeight = 0;
      const rect = previewRef.current.getBoundingClientRect();

      try {
        imageData = await toPng(previewRef.current, {
          cacheBust: true,
          allowTaint: false,
          backgroundColor,
          pixelRatio: 2,
        });
        exportWidth = Math.max(Math.round(rect.width * 2), 1);
        exportHeight = Math.max(Math.round(rect.height * 2), 1);
      } catch {
        const canvas = await html2canvas(previewRef.current, {
          useCORS: true,
          allowTaint: false,
          backgroundColor,
          scale: 2,
        });
        imageData = canvas.toDataURL("image/png");
        exportWidth = canvas.width;
        exportHeight = canvas.height;
      }

      const fileBaseName = (title || "map-canvas-poster")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      if (format === "pdf") {
        const pdf = new jsPDF({
          orientation: exportWidth >= exportHeight ? "landscape" : "portrait",
          unit: "px",
          format: [exportWidth, exportHeight],
        });

        pdf.addImage(imageData, "PNG", 0, 0, exportWidth, exportHeight);
        pdf.save(`${fileBaseName || "map-canvas-poster"}.pdf`);
        setSearchFeedback("Preview downloaded as PDF.");
        return;
      }

      const link = document.createElement("a");
      link.href = imageData;
      link.download = `${fileBaseName || "map-canvas-poster"}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSearchFeedback(`Preview downloaded as ${format.toUpperCase()}.`);
    } catch {
      setSearchFeedback("Preview export failed. Try another map style or search again.");
    } finally {
      setIsExporting(false);
    }
  };

  const createGalleryPreview = async () => {
    if (!previewRef.current) {
      return "";
    }

    try {
      return await toJpeg(previewRef.current, {
        cacheBust: true,
        quality: 0.82,
        backgroundColor,
        pixelRatio: 1,
      });
    } catch {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        allowTaint: false,
        backgroundColor,
        scale: 1,
      });

      return canvas.toDataURL("image/jpeg", 0.82);
    }
  };

  const saveDesign = async () => {
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
      textColor,
      selectedTextPlacementId,
    };

    try {
      const previewImage = await createGalleryPreview();
      const savedAt = new Date().toISOString();

      saveCurrentDesign(design);
      savePosterToGallery({
        id: `${savedAt}-${Math.random().toString(36).slice(2, 8)}`,
        title: title || "Untitled location",
        subtitle: subtitle || "Custom map poster",
        selectedLocationLabel: selectedLocationLabel || "Saved from editor",
        previewImage,
        mapStyleName: selectedMapStyle.name,
        themeName: selectedTheme.name,
        posterSize,
        orientation,
        savedAt,
        design,
      });

      setSearchFeedback("Poster saved to your gallery.");
    } catch {
      setSearchFeedback("Saving failed. Try again after the map preview finishes loading.");
    }
  };

  const resetPosition = () => {
    setMapCenter(initialState.mapCenter);
    setZoom(initialState.zoom);
    setSearchFeedback("Map position reset.");
  };

  return (
    <main className="pb-56 pt-24 md:pb-48 md:pt-28">
      <section className="rounded-[2rem] border border-gray-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,244,238,0.96))] p-3 shadow-[0_30px_80px_rgba(15,23,42,0.08)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:shadow-[0_38px_90px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[linear-gradient(135deg,_rgba(14,14,14,0.98),_rgba(24,24,24,0.98))] md:rounded-[2.5rem] md:p-8">
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
            textColor={textColor}
            setTextColor={setTextColor}
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            textPlacementPresets={textPlacementPresets}
            selectedTextPlacementId={selectedTextPlacementId}
            setSelectedTextPlacementId={setSelectedTextPlacementId}
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
            textColor={textColor}
            title={title}
            subtitle={subtitle}
            showCoordinates={showCoordinates}
            selectedTextPlacement={selectedTextPlacement}
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
