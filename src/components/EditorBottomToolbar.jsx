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
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed inset-x-2 bottom-2 z-[700] md:inset-x-8 md:bottom-4">
      <div className="mx-auto max-w-6xl rounded-[1.35rem] border border-gray-200/80 bg-white/94 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-[transform,box-shadow] duration-300 ease-out dark:border-white/10 dark:bg-[#0f172ae8] md:rounded-[1.8rem] md:p-3">
        <div className="flex flex-col gap-3 rounded-[1.1rem] border border-gray-200/80 bg-white/75 px-3 py-3 dark:border-white/10 dark:bg-white/5 md:flex-row md:items-center md:justify-between md:rounded-[1.35rem] md:px-4">
          <div>
            <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-gray-300/90 md:hidden dark:bg-white/20" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
              Quick Controls
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Use this bottom sheet for actions, zoom, and quick map changes.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setIsMinimized((current) => !current)}
              className={`rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${toolbarButtonClass}`}
            >
              {isMinimized ? "Open Controls" : "Hide Controls"}
            </button>
          </div>
        </div>

        {isMinimized ? null : (
          <div className="mt-3 max-h-[55vh] overflow-y-auto overscroll-contain pr-1 transition-[opacity,transform] duration-300 ease-out md:max-h-none md:overflow-visible">
            <div className="grid gap-2 md:gap-3 xl:grid-cols-[0.85fr_1.05fr_1fr_0.95fr_1.2fr]">
            <ToolbarCard title="Zoom Controls">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.min(18, current + 1))}
                  className={`rounded-2xl bg-black px-2 py-2 text-sm font-semibold text-white hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] md:text-base ${toolbarButtonClass}`}
                >
                  Zoom In +
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.max(2, current - 1))}
                  className={`rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${toolbarButtonClass}`}
                >
                  Zoom Out -
                </button>
              </div>
            </ToolbarCard>

            <ToolbarCard title="Style Switcher">
              <div className="grid grid-cols-2 gap-2">
                {mapStyles.slice(0, 6).map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedMapStyleId(style.id)}
                    className={`rounded-2xl px-2 py-2 text-xs font-semibold md:text-sm ${toolbarButtonClass} ${
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

            <ToolbarCard title="Text Toggles">
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

            <ToolbarCard title="Export Actions">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => exportPreview("png")}
                  disabled={isExporting}
                  className={`rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] ${toolbarButtonClass}`}
                >
                  PNG
                </button>
                <button
                  type="button"
                  onClick={() => exportPreview("pdf")}
                  disabled={isExporting}
                  className={`rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:border-[#FF9B42] hover:text-[#C76614] disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E] ${toolbarButtonClass}`}
                >
                  PDF
                </button>
                <button
                  type="button"
                  onClick={saveDesign}
                  className={`rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-[#C76614] dark:bg-white dark:text-black dark:hover:bg-[#FFB36E] ${toolbarButtonClass}`}
                >
                  Save Design
                </button>
              </div>
            </ToolbarCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorBottomToolbar;
