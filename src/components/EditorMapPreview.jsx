import { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

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

function EditorMapPreview(props) {
  const {
    previewRef,
    previewSizeClass,
    previewStyle,
    mapHeightClass,
    mapSurfaceStyle,
    hasActiveLocation,
    mapCenter,
    zoom,
    tileConfig,
    onViewChange,
    backgroundColor,
    primaryColor,
    mapTintStyle,
    showTitle,
    selectedTheme,
    accentColor,
    textColor,
    title,
    subtitle,
    showCoordinates,
    selectedTextPlacement,
    selectedMapStyle,
    posterSize,
    orientation,
    selectedLocationLabel,
    textPanelStyle,
  } = props;

  return (
    <div className="flex min-h-[calc(100vh-18rem)] items-center justify-center rounded-[1.6rem] border border-gray-200/80 bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.16),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(245,240,234,0.96))] p-3 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.12),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] md:min-h-[calc(100vh-14rem)] md:rounded-[2rem] md:p-8">
      <div
        ref={previewRef}
        className={`mx-auto w-full ${previewSizeClass} rounded-[1.7rem] border p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)] md:rounded-[2.2rem] md:p-5`}
        style={previewStyle}
      >
        <div className="overflow-hidden rounded-[1.3rem] border border-black/10 md:rounded-[1.7rem]">
          <div className={`relative w-full overflow-hidden ${mapHeightClass}`} style={mapSurfaceStyle}>
            {hasActiveLocation ? (
              <MapContainer
                center={mapCenter}
                zoom={zoom}
                zoomControl={false}
                attributionControl={false}
                className="h-full w-full"
              >
                <TileLayer
                  url={tileConfig.url}
                  attribution={tileConfig.attribution}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <MapViewportController center={mapCenter} zoom={zoom} onViewChange={onViewChange} />
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
              className="pointer-events-none absolute inset-0 opacity-55 md:opacity-60"
              style={mapTintStyle}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/28 via-black/10 to-transparent md:h-36" />

            {showTitle && hasActiveLocation ? (
              <div
                className={`pointer-events-none absolute z-[500] ${selectedTextPlacement.outerClass}`}
              >
                <div className={selectedTextPlacement.innerClass}>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.4em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                    style={{ color: accentColor }}
                  >
                    Custom Map Poster
                  </p>
                  <h1
                    className="mt-3 text-2xl leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] md:text-4xl"
                    style={{ fontFamily: "'Playfair Display', 'serif'", color: textColor }}
                  >
                    {title || "Untitled location"}
                  </h1>
                  {subtitle ? (
                    <p
                      className="mt-2 text-sm drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] md:text-base"
                      style={{ color: textColor }}
                    >
                      {subtitle}
                    </p>
                  ) : null}
                  {showCoordinates ? (
                    <p
                      className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                      style={{ color: accentColor }}
                    >
                      {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-black/10 p-4 md:p-8" style={textPanelStyle}>
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
              <span style={{ color: selectedTheme.secondaryInk }}>{selectedMapStyle.name}</span>
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
  );
}

export default EditorMapPreview;
