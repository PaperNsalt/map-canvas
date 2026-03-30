import { useState } from "react";

const interactiveCardClass =
  "transform-gpu transition-[transform,border-color,background-color,box-shadow,color,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)] active:scale-[0.98] active:translate-y-0";

const interactiveButtonClass =
  "transform-gpu transition-[transform,border-color,background-color,box-shadow,color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)] active:scale-[0.98] active:translate-y-0";

function ControlLabel({ children }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
      {children}
    </label>
  );
}

function SidebarSection({ title, children }) {
  return (
    <section className="rounded-[1.25rem] border border-gray-200/80 bg-white/70 p-3 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5 md:rounded-[1.6rem] md:p-4">
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
      className={`rounded-[1.1rem] border p-3 text-left md:rounded-[1.35rem] ${interactiveCardClass} ${
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
      className={`rounded-[1.1rem] border p-3 text-left md:rounded-[1.35rem] ${interactiveCardClass} ${
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

function PlacementCard({ placement, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(placement.id)}
      className={`rounded-[1.1rem] border p-3 text-left md:rounded-[1.35rem] ${interactiveCardClass} ${
        selected
          ? "border-[#FF9B42] bg-[#FF9B42]/10"
          : "border-gray-200 bg-white hover:border-[#FF9B42] dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <div className="relative h-16 overflow-hidden rounded-[1rem] border border-black/10 bg-[linear-gradient(160deg,_rgba(15,23,42,0.82),_rgba(51,65,85,0.92))]">
        <span
          className={`absolute h-2 w-24 rounded-full bg-white/85 ${
            placement.id === "top-center"
              ? "left-1/2 top-3 -translate-x-1/2"
              : placement.id === "center-stage"
                ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                : placement.id === "bottom-left"
                  ? "bottom-3 left-3"
                  : "bottom-3 left-1/2 -translate-x-1/2"
          }`}
        />
      </div>
      <p className="mt-3 text-sm font-semibold">{placement.name}</p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{placement.description}</p>
    </button>
  );
}

function SidebarContent(props) {
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    isSearching,
    selectedLocationLabel,
    searchFeedback,
    locationPresets,
    handleLocationPreset,
    mapStyles,
    selectedMapStyleId,
    setSelectedMapStyleId,
    themePresets,
    selectedThemeId,
    applyTheme,
    primaryColor,
    setPrimaryColor,
    backgroundColor,
    setBackgroundColor,
    accentColor,
    setAccentColor,
    textColor,
    setTextColor,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    textPlacementPresets,
    selectedTextPlacementId,
    setSelectedTextPlacementId,
    showTitle,
    setShowTitle,
    showCoordinates,
    setShowCoordinates,
    showPlaceNames,
    setShowPlaceNames,
    posterSize,
    setPosterSize,
    orientation,
    setOrientation,
    zoom,
    setZoom,
    centerMap,
  } = props;

  return (
    <>
      <div className="rounded-[1.25rem] border border-gray-200/80 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
            Customize Your Map
          </p>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            Shape the location, style, and text details from this sidebar.
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-3 overflow-y-auto pr-1 md:space-y-4">
        <SidebarSection title="A. Location">
          <div>
            <ControlLabel>Search</ControlLabel>
            <form onSubmit={handleSearch} className="mt-3 space-y-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for a location..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-[transform,border-color,box-shadow] duration-200 ease-out focus:-translate-y-0.5 focus:border-[#FF9B42] focus:shadow-[0_0_0_4px_rgba(255,155,66,0.12)] dark:border-white/10 dark:bg-white/5"
              />
              <button
                type="submit"
                disabled={isSearching}
                className={`w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] ${interactiveButtonClass}`}
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
                className={`rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${interactiveButtonClass}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="B. Map Style">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <span className="text-sm font-semibold">Text color</span>
              <input
                type="color"
                value={textColor}
                onChange={(event) => setTextColor(event.target.value)}
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
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-[transform,border-color,box-shadow] duration-200 ease-out focus:-translate-y-0.5 focus:border-[#FF9B42] focus:shadow-[0_0_0_4px_rgba(255,155,66,0.12)] dark:border-white/10 dark:bg-white/5"
              />
              <input
                type="text"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                placeholder="Subtitle"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-[transform,border-color,box-shadow] duration-200 ease-out focus:-translate-y-0.5 focus:border-[#FF9B42] focus:shadow-[0_0_0_4px_rgba(255,155,66,0.12)] dark:border-white/10 dark:bg-white/5"
              />
          </div>
          <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold dark:border-white/10 dark:bg-white/5">
            Show Title
            <input
              type="checkbox"
              checked={showTitle}
              onChange={() => setShowTitle((current) => !current)}
              className="size-4 accent-[#FF9B42]"
            />
          </label>
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
          <div>
            <ControlLabel>Text Placement</ControlLabel>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {textPlacementPresets.map((placement) => (
                <PlacementCard
                  key={placement.id}
                  placement={placement}
                  selected={selectedTextPlacementId === placement.id}
                  onSelect={setSelectedTextPlacementId}
                />
              ))}
            </div>
          </div>
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
                  className={`rounded-2xl border px-3 py-3 text-sm font-semibold ${interactiveButtonClass} ${
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
                  className={`rounded-2xl border px-3 py-3 text-sm font-semibold capitalize ${interactiveButtonClass} ${
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
            onClick={centerMap}
            className={`w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${interactiveButtonClass}`}
          >
            Center Map
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Drag map to adjust position
          </p>
        </SidebarSection>

        <SidebarSection title="H. Workflow">
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
            Use this panel to customize the poster, then use the bottom toolbar to
            save, reset, and download what you see in the preview.
          </p>
        </SidebarSection>
      </div>
    </>
  );
}

function EditorSidebar(props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed left-0 top-1/2 z-[680] -translate-y-1/2 xl:hidden">
        <div className="flex items-center">
          <div
            className={`max-h-[78vh] overflow-hidden transition-[width,opacity,transform] duration-300 ease-out ${
              isMobileOpen ? "w-[min(84vw,360px)] opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className={`h-full rounded-r-[1.6rem] border border-l-0 border-gray-200/80 bg-white/95 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 ease-out dark:border-white/10 dark:bg-[#0f172ae8] ${isMobileOpen ? "translate-x-0" : "-translate-x-3"}`}>
              <div className="max-h-[78vh] overflow-y-auto pr-1">
                <SidebarContent {...props} />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen((current) => !current)}
            className={`ml-2 rounded-r-2xl rounded-l-none border border-l-0 border-gray-200 bg-white px-3 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-gray-700 shadow-[0_12px_32px_rgba(15,23,42,0.12)] hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-[#111827] dark:text-gray-200 dark:hover:text-[#FFB36E] ${interactiveButtonClass}`}
            aria-label={isMobileOpen ? "Hide sidebar" : "Open sidebar"}
          >
            {isMobileOpen ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      <aside className="hidden xl:sticky xl:top-28 xl:block xl:self-start">
        <div className="rounded-[2rem] border border-gray-200/80 bg-white/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
            <SidebarContent {...props} />
          </div>
        </div>
      </aside>
    </>
  );
}

export default EditorSidebar;
