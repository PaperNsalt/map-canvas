import { useState } from "react";

const toolbarButtonClass =
  "transform-gpu transition-[transform,border-color,background-color,box-shadow,color,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)] active:scale-[0.98] active:translate-y-0";

function ToolbarCard({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-[1.1rem] border border-gray-200/80 bg-white/80 p-3 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5 md:rounded-[1.3rem] ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function EditorBottomToolbar(props) {
  const {
    setZoom,
    mapStyles,
    selectedMapStyleId,
    setSelectedMapStyleId,
    resetPosition,
    centerMap,
    showTitle,
    setShowTitle,
    showCoordinates,
    setShowCoordinates,
    exportPreview,
    isExporting,
    saveDesign,
  } = props;
  const [isMinimized, setIsMinimized] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const selectedStyle = mapStyles.find((style) => style.id === selectedMapStyleId);
  const contentStateClass = isMinimized
    ? "max-h-0 translate-y-3 opacity-0"
    : "max-h-[38vh] translate-y-0 opacity-100 md:max-h-[42vh] lg:max-h-none";

  return (
    <div className="fixed inset-x-1.5 bottom-1.5 z-[700] md:inset-x-6 md:bottom-4">
      <div className="mx-auto max-w-5xl rounded-[1.2rem] border border-gray-200/80 bg-white/94 p-2 shadow-[0_20px_44px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 ease-out dark:border-white/10 dark:bg-[#0f172ae8] md:rounded-[1.8rem] md:p-3">
        <div className="rounded-[1rem] border border-gray-200/80 bg-white/75 px-3 py-2.5 dark:border-white/10 dark:bg-white/5 md:rounded-[1.35rem] md:px-4 md:py-3">
          <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-gray-300/90 transition-all duration-300 md:hidden dark:bg-white/20" />
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
                Quick Controls
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#FF9B42]/12 px-2.5 py-1 text-[11px] font-semibold text-[#C76614] dark:text-[#FFB36E]">
                  {selectedStyle?.name ?? "Style"}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {isMinimized ? "Tap to expand actions" : "Swipe cards on mobile"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={saveDesign}
                className={`hidden rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] md:inline-flex ${toolbarButtonClass}`}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized((current) => !current)}
                className={`inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${toolbarButtonClass}`}
                aria-expanded={!isMinimized}
                aria-label={isMinimized ? "Open controls" : "Hide controls"}
              >
                <span>{isMinimized ? "Open Controls" : "Hide Controls"}</span>
                <span
                  className={`text-base leading-none transition-transform duration-300 ease-out ${
                    isMinimized ? "rotate-0" : "rotate-180"
                  }`}
                >
                  ^
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity,transform,margin] duration-300 ease-out ${contentStateClass} ${isMinimized ? "mt-0 pointer-events-none" : "mt-2 md:mt-3"}`}
        >
          <div className="overflow-y-auto overscroll-contain pr-1 md:overflow-y-auto lg:overflow-visible">
            <div className="grid auto-cols-[minmax(220px,82vw)] grid-flow-col snap-x snap-mandatory gap-2 overflow-x-auto pb-1 md:grid-flow-row md:grid-cols-2 md:overflow-visible lg:grid-cols-[0.85fr_1.05fr_1fr_0.95fr_1.2fr] md:pb-0">
            <ToolbarCard title="Zoom Controls" className="min-w-[220px] snap-start md:min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.min(18, current + 1))}
                  className={`rounded-2xl bg-black px-2 py-2 text-sm font-semibold text-white hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] ${toolbarButtonClass}`}
                >
                  Zoom In +
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.max(2, current - 1))}
                  className={`rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${toolbarButtonClass}`}
                >
                  Zoom Out -
                </button>
              </div>
            </ToolbarCard>

            <ToolbarCard title="Style Switcher" className="min-w-[260px] snap-start md:min-w-0">
              <div className="grid grid-cols-2 gap-2">
                {mapStyles.slice(0, 6).map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedMapStyleId(style.id)}
                    className={`rounded-2xl px-2 py-2 text-xs font-semibold ${toolbarButtonClass} ${
                      selectedMapStyleId === style.id
                        ? "bg-[#FF9B42] text-black"
                        : "border border-gray-200 bg-white text-gray-700 hover:border-[#FF9B42] dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </ToolbarCard>

            <ToolbarCard title="Map Movement" className="min-w-[240px] snap-start md:min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={resetPosition}
                  className={`rounded-2xl border border-gray-200 bg-white px-2 py-2 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${toolbarButtonClass}`}
                >
                  Reset Position
                </button>
                <button
                  type="button"
                  onClick={centerMap}
                  className={`rounded-2xl bg-black px-2 py-2 text-sm font-semibold text-white hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] ${toolbarButtonClass}`}
                >
                  Center Map
                </button>
              </div>
            </ToolbarCard>

            <ToolbarCard title="Text Toggles" className="min-w-[220px] snap-start md:min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowTitle((current) => !current)}
                  className={`rounded-2xl px-2 py-3 text-sm font-semibold ${toolbarButtonClass} ${
                    showTitle
                      ? "bg-[#FF9B42] text-black"
                      : "border border-gray-200 bg-white text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                  }`}
                >
                  Show Title
                </button>
                <button
                  type="button"
                  onClick={() => setShowCoordinates((current) => !current)}
                  className={`rounded-2xl px-2 py-3 text-sm font-semibold ${toolbarButtonClass} ${
                    showCoordinates
                      ? "bg-[#FF9B42] text-black"
                      : "border border-gray-200 bg-white text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                  }`}
                >
                  Coordinates
                </button>
              </div>
            </ToolbarCard>

            <ToolbarCard title="Export Actions" className="min-w-[260px] snap-start md:min-w-0">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => exportPreview("png")}
                  disabled={isExporting}
                  className={`rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] ${toolbarButtonClass}`}
                >
                  PNG
                </button>
                <button
                  type="button"
                  onClick={() => exportPreview("pdf")}
                  disabled={isExporting}
                  className={`rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${toolbarButtonClass}`}
                >
                  PDF
                </button>
                <button
                  type="button"
                  onClick={saveDesign}
                  className={`rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] md:hidden ${toolbarButtonClass}`}
                >
                  Save Design
                </button>
              </div>
            </ToolbarCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorBottomToolbar;
