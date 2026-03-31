import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

import IconComponent from "./IconComponent";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/MAPCANVAS LOGO.svg";

const navLinks = [
  { name: "Home", path: "/", icon: "home" },
  { name: "Editor", path: "/editor", icon: "editor" },
  { name: "Gallery", path: "/gallery", icon: "gallery" },
  { name: "About", path: "/about", icon: "info" },
];

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -18,
    scale: 0.96,
    transition: { duration: 0.18, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    y: 10,
    scale: 1,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[95%] max-w-6xl -translate-x-1/2">
      <Motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/78 px-4 py-3 text-gray-900 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-black/68 dark:text-white md:px-6"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF9B42]/70 to-transparent" />

        <div className="flex items-center justify-between gap-4">
          <Motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <NavLink to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <div className="relative flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#FFB36E,_#FF8C2A)] shadow-lg shadow-[#FF9B42]/25">
                <div className="absolute inset-[1px] rounded-2xl bg-white/85 dark:bg-black/55" />
                <img
                  src={logo}
                  alt="MapCanvas logo"
                  className="relative z-10 size-7"
                />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#C76614] dark:text-[#FFB36E]">
                  Design Studio
                </span>
                <span className="mt-1 text-lg font-bold tracking-[0.18em]">
                  MAPCANVAS
                </span>
              </div>
            </NavLink>
          </Motion.div>

          <div className="hidden items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-2 py-2 shadow-inner shadow-black/5 dark:border-white/10 dark:bg-white/5 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className="relative">
                {({ isActive }) => (
                  <Motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-black dark:text-white"
                        : "text-gray-600 hover:text-[#C76614] dark:text-gray-300 dark:hover:text-[#FFB36E]"
                    }`}
                    style={{ fontFamily: "'Quicksand', 'sans-serif'" }}
                  >
                    {isActive && (
                      <Motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full bg-[#FF9B42]/18 dark:bg-[#FF9B42]/24"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <IconComponent name={link.icon} className="size-4" />
                      <span>{link.name}</span>
                    </span>
                  </Motion.span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <Motion.button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="flex size-11 items-center justify-center rounded-2xl border border-gray-200/80 bg-white/75 text-gray-900 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-white/10 dark:bg-white/6 dark:text-white md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <Motion.span
                animate={isOpen ? { rotate: 90, scale: 0.96 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <IconComponent name={isOpen ? "close" : "menu"} className="size-5" />
              </Motion.span>
            </Motion.button>
          </div>
        </div>
      </Motion.div>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute left-0 top-full mt-3 w-full md:hidden"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/92 p-4 shadow-[0_28px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-black/88">
              <div className="mb-4 flex items-center justify-between rounded-[1.4rem] border border-gray-200/80 bg-gray-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/5 sm:hidden">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
                    Theme
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Switch appearance
                  </p>
                </div>
                <ThemeToggle />
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <Motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: index * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-[1.4rem] px-4 py-3.5 text-base font-semibold transition-colors duration-300 ${
                          isActive
                            ? "bg-[#FF9B42]/16 text-black dark:text-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/8"
                        }`
                      }
                      style={{ fontFamily: "'Quicksand', 'sans-serif'" }}
                    >
                      {({ isActive }) => (
                        <>
                          <span className="flex items-center gap-3">
                            <IconComponent name={link.icon} className="size-5" />
                            <span>{link.name}</span>
                          </span>
                          <span className="text-sm text-[#C76614] dark:text-[#FFB36E]">
                            {isActive ? "Current" : "Open"}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </Motion.div>
                ))}
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
