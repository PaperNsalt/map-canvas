const GALLERY_STORAGE_KEY = "map-canvas-gallery";
const LEGACY_DESIGN_STORAGE_KEY = "map-canvas-design";
const MAX_SAVED_POSTERS = 12;

export function readSavedPosters() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function savePosterToGallery(poster) {
  const existingPosters = readSavedPosters();
  const nextPosters = [poster, ...existingPosters].slice(0, MAX_SAVED_POSTERS);
  window.localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(nextPosters));
  return nextPosters;
}

export function deletePosterFromGallery(posterId) {
  const nextPosters = readSavedPosters().filter((poster) => poster.id !== posterId);
  window.localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(nextPosters));
  return nextPosters;
}

export function saveCurrentDesign(design) {
  window.localStorage.setItem(LEGACY_DESIGN_STORAGE_KEY, JSON.stringify(design));
}

export { GALLERY_STORAGE_KEY, LEGACY_DESIGN_STORAGE_KEY };
