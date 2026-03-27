import { useState } from "react";

function ToolbarCard({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-[1.3rem] flex justify-center items-center flex-col border border-gray-200/80 bg-white/80 p-3 dark:border-white/10 dark:bg-white/5 ${className}`}
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
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed inset-x-4 bottom-4 z-[700] md:inset-x-8">
      <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-gray-200/80 bg-white/88 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0f172acc]">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-gray-200/80 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
              Quick Controls
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Keep the map visible while adjusting the essentials.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportPreview("png")}
              disabled={isExporting}
              className="rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-[#FFB36E]"
            >
              {isExporting ? "Preparing..." : "Download PNG"}
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized((current) => !current)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
            >
              {isMinimized ? "Expand Toolbar" : "Minimize Toolbar"}
            </button>
          </div>
        </div>

        {isMinimized ? null : (
          <div className="mt-3 grid gap-3 xl:grid-cols-[0.85fr_1.05fr_1fr_0.95fr_1.2fr]">
            <ToolbarCard title="Zoom Controls">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.min(18, current + 1))}
                  className="rounded-2xl bg-black px-2 py-2 text-base font-semibold text-white transition hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E]"
                >
                  Zoom In +
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.max(2, current - 1))}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                >
                  Zoom Out -
                </button>
              </div>
            </ToolbarCard>

            <ToolbarCard title="Style Switcher">
              <div className="grid grid-cols-3 gap-1">
                {mapStyles.slice(0, 3).map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedMapStyleId(style.id)}
                    className={`rounded-2xl px-1 py-2 text-sm font-semibold transition ${
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

            <ToolbarCard title="Map Movement">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={resetPosition}
                  className="rounded-2xl border border-gray-200 bg-white px-2 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                >
                  Reset Position
                </button>
                <button
                  type="button"
                  onClick={centerMap}
                  className="rounded-2xl bg-black px-2 py-2 text-sm font-semibold text-white transition hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E]"
                >
                  Center Map
                </button>
              </div>
            </ToolbarCard>

            <ToolbarCard title="Text Toggles">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowTitle((current) => !current)}
                  className={`rounded-2xl px-2 py-3 text-sm font-semibold transition ${
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
                  className={`rounded-2xl px-1 py-1 text-sm font-semibold transition ${
                    showCoordinates
                      ? "bg-[#FF9B42] text-black"
                      : "border border-gray-200 bg-white text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                  }`}
                >
                  Coordinates
                </button>
              </div>
            </ToolbarCard>

            <ToolbarCard title="Export Actions">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => exportPreview("png")}
                  disabled={isExporting}
                  className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-[#FFB36E]"
                >
                  PNG
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-2xl border border-dashed border-gray-300 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                >
                  PDF Premium
                </button>
                <button
                  type="button"
                  onClick={saveDesign}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                >
                  Share
                </button>
              </div>
            </ToolbarCard>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorBottomToolbar;
