import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

function SunIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.3" />
      <path d="M12 19.2v2.3" />
      <path d="m4.93 4.93 1.63 1.63" />
      <path d="m17.44 17.44 1.63 1.63" />
      <path d="M2.5 12h2.3" />
      <path d="M19.2 12h2.3" />
      <path d="m4.93 19.07 1.63-1.63" />
      <path d="m17.44 6.56 1.63-1.63" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.6 14.1A8.8 8.8 0 0 1 9.9 3.4a.55.55 0 0 0-.77-.63A10.1 10.1 0 1 0 21.23 14.9a.55.55 0 0 0-.63-.8Z" />
    </svg>
  );
}

function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex h-8 w-[3.55rem] items-center rounded-full border p-[3px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_2px_rgba(0,0,0,0.08)] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9B42] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black ${
        darkMode
          ? "border-white/12 bg-[linear-gradient(180deg,_#3A3A3C,_#1C1C1E)]"
          : "border-black/8 bg-[linear-gradient(180deg,_#F4F4F5,_#DFE1E5)]"
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-[3px] rounded-full transition-opacity duration-300 ${
          darkMode
            ? "bg-[radial-gradient(circle_at_28%_50%,_rgba(255,255,255,0.09),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.10),_rgba(255,255,255,0.02))]"
            : "bg-[radial-gradient(circle_at_74%_50%,_rgba(255,255,255,0.96),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(255,255,255,0.4))]"
        }`}
      />

      <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
        <SunIcon
          className={`size-3.5 transition-colors duration-300 ${
            darkMode ? "text-white/35" : "text-[#F4A21D]"
          }`}
        />
      </span>

      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <MoonIcon
          className={`size-3.5 transition-colors duration-300 ${
            darkMode ? "text-white/80" : "text-slate-400"
          }`}
        />
      </span>

      <motion.span
        layout
        transition={{ type: "spring", stiffness: 760, damping: 36 }}
        className="relative z-10 flex size-6 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18),0_8px_18px_rgba(0,0,0,0.12)]"
      >
        <span className="absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(242,242,242,0.9))]" />
        <motion.span
          key={darkMode ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -20, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="relative z-10"
        >
          {darkMode ? (
            <MoonIcon className="size-3.5 text-slate-700" />
          ) : (
            <SunIcon className="size-3.5 text-[#F4A21D]" />
          )}
        </motion.span>
      </motion.span>
    </motion.button>
  );
}

export default ThemeToggle;
