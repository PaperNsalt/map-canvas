export const mapStyles = [
  {
    id: "light",
    name: "Light",
    previewClass:
      "bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)] before:bg-white/80 after:bg-slate-300",
  },
  {
    id: "dark",
    name: "Dark",
    previewClass:
      "bg-[linear-gradient(135deg,#0f172a,#334155)] before:bg-slate-500/40 after:bg-slate-200/60",
  },
  {
    id: "minimal",
    name: "Minimal",
    previewClass:
      "bg-[linear-gradient(135deg,#fafaf9,#e7e5e4)] before:bg-stone-200/80 after:bg-stone-400/70",
  },
  {
    id: "satellite",
    name: "Satellite",
    previewClass:
      "bg-[linear-gradient(135deg,#365314,#1f2937)] before:bg-emerald-600/35 after:bg-amber-200/60",
  },
];

export const themePresets = [
  {
    id: "modern",
    name: "Modern",
    posterBackground: "#f8fafc",
    posterBorder: "#cbd5e1",
    panelBackground: "rgba(255,255,255,0.88)",
    ink: "#0f172a",
    secondaryInk: "#475569",
    accent: "#2563eb",
    marker: "#2563eb",
    primaryColor: "#2563eb",
    backgroundColor: "#f8fafc",
    accentColor: "#f97316",
    mapFilter: "saturate(1.05) contrast(1.05)",
  },
  {
    id: "vintage",
    name: "Vintage",
    posterBackground: "#f4e7d7",
    posterBorder: "#caa989",
    panelBackground: "rgba(255,248,240,0.88)",
    ink: "#3f2a1d",
    secondaryInk: "#7a5c49",
    accent: "#b45309",
    marker: "#b45309",
    primaryColor: "#9a3412",
    backgroundColor: "#f4e7d7",
    accentColor: "#d97706",
    mapFilter:
      "sepia(0.35) saturate(0.9) contrast(0.96) brightness(1.02) hue-rotate(-10deg)",
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    posterBackground: "#0f172a",
    posterBorder: "#334155",
    panelBackground: "rgba(15,23,42,0.84)",
    ink: "#f8fafc",
    secondaryInk: "#cbd5e1",
    accent: "#38bdf8",
    marker: "#38bdf8",
    primaryColor: "#38bdf8",
    backgroundColor: "#0f172a",
    accentColor: "#a855f7",
    mapFilter: "invert(1) hue-rotate(180deg) saturate(0.55) contrast(1.1)",
  },
  {
    id: "pastel",
    name: "Pastel",
    posterBackground: "#fdf2f8",
    posterBorder: "#f9a8d4",
    panelBackground: "rgba(255,255,255,0.86)",
    ink: "#4a044e",
    secondaryInk: "#86198f",
    accent: "#ec4899",
    marker: "#ec4899",
    primaryColor: "#ec4899",
    backgroundColor: "#fdf2f8",
    accentColor: "#8b5cf6",
    mapFilter:
      "saturate(0.9) contrast(0.98) brightness(1.04) hue-rotate(8deg)",
  },
];

export const locationPresets = [
  {
    id: "manila",
    label: "Manila",
    center: [14.5995, 120.9842],
    zoom: 13,
    title: "Manila",
    subtitle: "Philippines",
  },
  {
    id: "new-york",
    label: "New York",
    center: [40.7128, -74.006],
    zoom: 13,
    title: "New York",
    subtitle: "United States",
  },
  {
    id: "paris",
    label: "Paris",
    center: [48.8566, 2.3522],
    zoom: 13,
    title: "Paris",
    subtitle: "France",
  },
  {
    id: "tokyo",
    label: "Tokyo",
    center: [35.6762, 139.6503],
    zoom: 13,
    title: "Tokyo",
    subtitle: "Japan",
  },
];

export const initialState = {
  selectedMapStyleId: "light",
  selectedThemeId: "modern",
  mapCenter: [14.5995, 120.9842],
  zoom: 13,
  title: "",
  subtitle: "",
  searchQuery: "",
  selectedLocationLabel: "",
  showCoordinates: true,
  showPlaceNames: true,
  posterSize: "a4",
  orientation: "portrait",
  primaryColor: "#2563eb",
  backgroundColor: "#f8fafc",
  accentColor: "#f97316",
};
