function ControlLabel({ children }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
      {children}
    </label>
  );
}

function SidebarSection({ title, children }) {
  return (
    <section className="rounded-[1.25rem] border border-gray-200/80 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5 md:rounded-[1.6rem] md:p-4">
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
      className={`rounded-[1.1rem] border p-3 text-left transition md:rounded-[1.35rem] ${
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
      className={`rounded-[1.1rem] border p-3 text-left transition md:rounded-[1.35rem] ${
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

function EditorSidebar(props) {
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
    title,
    setTitle,
    subtitle,
    setSubtitle,
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
    saveDesign,
    resetDesign,
    exportPreview,
    isExporting,
  } = props;

  return (
    <aside className="xl:sticky xl:top-28 xl:self-start">
      <div className="space-y-3 rounded-[1.6rem] border border-gray-200/80 bg-white/80 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 md:space-y-4 md:rounded-[2rem] md:p-5 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto">
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
            onClick={centerMap}
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
              {isExporting ? "Preparing..." : "Download PNG"}
            </button>
            <button
              type="button"
              onClick={() => exportPreview("pdf")}
              disabled={isExporting}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
            >
              {isExporting ? "Preparing..." : "Download PDF"}
            </button>
          </div>
        </SidebarSection>
      </div>
    </aside>
  );
}

export default EditorSidebar;
