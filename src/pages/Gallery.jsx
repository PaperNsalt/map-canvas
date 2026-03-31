import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePosterFromGallery, readSavedPosters } from "../utils/galleryStorage";

const galleryHighlights = [
  {
    label: "Private collection",
    value: "Local saves",
    description: "Every poster you save in the editor is collected here on this device.",
  },
  {
    label: "Quick browsing",
    value: "Recent first",
    description: "Your newest saved posters appear at the top so they are easy to revisit.",
  },
  {
    label: "Ready to print",
    value: "Design details",
    description: "Each card keeps the title, place, theme, and format choices together.",
  },
];

function formatSavedDate(value) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Recently saved";
  }
}

function GalleryPage() {
  const [savedPosters, setSavedPosters] = useState([]);

  useEffect(() => {
    const syncGallery = () => {
      setSavedPosters(readSavedPosters());
    };

    syncGallery();
    window.addEventListener("storage", syncGallery);

    return () => {
      window.removeEventListener("storage", syncGallery);
    };
  }, []);

  const handleDelete = (posterId) => {
    setSavedPosters(deletePosterFromGallery(posterId));
  };

  return (
    <main className="pb-20 pt-28">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-gray-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(255,155,66,0.2),_transparent_30%),linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,244,238,0.95))] px-6 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-gray-800 dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,155,66,0.14),_transparent_30%),linear-gradient(135deg,_rgba(12,12,12,0.98),_rgba(22,22,22,0.98))] md:px-10 md:py-12">
        <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-[#FF9B42]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-black/8 blur-3xl dark:bg-white/8" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#FF9B42]/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[#C76614] dark:bg-white/8 dark:text-[#FFB36E]">
              Saved poster gallery
            </p>
            <h1
              className="mt-6 text-4xl leading-tight md:text-5xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Your saved map posters live here.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-700 dark:text-gray-300 md:text-lg">
              Save from the editor to build a personal collection of favorite places,
              travel memories, milestones, and gift-ready poster designs.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/editor"
                className="inline-flex items-center justify-center rounded-[1.25rem] bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-colors duration-300 hover:bg-[#FF9B42] dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-[#FF9B42]"
              >
                Create another poster
              </Link>
              <p className="inline-flex items-center rounded-[1.25rem] border border-gray-200/80 bg-white/70 px-5 py-3 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                {savedPosters.length} saved {savedPosters.length === 1 ? "poster" : "posters"} on this
                device
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {galleryHighlights.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.6rem] border border-white/60 bg-white/85 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C76614] dark:text-[#FFB36E]">
                  {item.label}
                </p>
                <h2
                  className="mt-3 text-2xl"
                  style={{ fontFamily: "'Playfair Display', 'serif'" }}
                >
                  {item.value}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        {savedPosters.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {savedPosters.map((poster) => (
              <article
                key={poster.id}
                className="overflow-hidden rounded-[2rem] border border-gray-200/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(247,243,238,0.92))] shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.03))]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-white/5">
                  {poster.previewImage ? (
                    <img
                      src={poster.previewImage}
                      alt={poster.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.22),_transparent_34%),linear-gradient(160deg,_rgba(248,250,252,1),_rgba(226,232,240,0.9))] px-8 text-center dark:bg-[radial-gradient(circle_at_top,_rgba(255,155,66,0.18),_transparent_30%),linear-gradient(160deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.92))]">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
                          Saved poster
                        </p>
                        <h3
                          className="mt-4 text-3xl"
                          style={{ fontFamily: "'Playfair Display', 'serif'" }}
                        >
                          {poster.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#FF9B42]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#C76614] dark:text-[#FFB36E]">
                      {poster.themeName || "Custom theme"}
                    </span>
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-700 dark:bg-white/10 dark:text-gray-200">
                      {poster.posterSize?.toUpperCase()} {poster.orientation}
                    </span>
                  </div>

                  <h2
                    className="mt-4 text-2xl leading-tight"
                    style={{ fontFamily: "'Playfair Display', 'serif'" }}
                  >
                    {poster.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    {poster.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {poster.selectedLocationLabel}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{poster.mapStyleName || "Map style"}</span>
                    <span>{formatSavedDate(poster.savedAt)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(poster.id)}
                    className="mt-6 inline-flex items-center justify-center rounded-[1rem] border border-gray-300/80 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-300 hover:border-red-300 hover:text-red-600 dark:border-white/10 dark:text-gray-200 dark:hover:border-red-500/40 dark:hover:text-red-300"
                  >
                    Remove from gallery
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2.2rem] border border-dashed border-gray-300/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(249,244,239,0.85))] px-8 py-14 text-center dark:border-white/12 dark:bg-[linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))]">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#C76614] dark:text-[#FFB36E]">
              No saved posters yet
            </p>
            <h2
              className="mt-5 text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Your gallery will fill up as you save designs from the editor.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-700 dark:text-gray-300">
              Search for a location, customize the map poster, then use the save action in
              the editor toolbar. Saved posters are stored locally in your browser.
            </p>
            <Link
              to="/editor"
              className="mt-8 inline-flex items-center justify-center rounded-[1.25rem] bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-colors duration-300 hover:bg-[#FF9B42] dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-[#FF9B42]"
            >
              Go to editor
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default GalleryPage;
