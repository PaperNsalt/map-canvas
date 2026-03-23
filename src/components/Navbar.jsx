import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import ThemeToggle from "./ThemeToggle";
import logo from '../assets/MAPCANVAS LOGO.svg'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Editor", path: "/editor" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
  ];

  return (
    // Fixed positioning to make it float, with glassmorphism (backdrop-blur)
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="bg-white/70 dark:bg-black/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-full text-gray-900 dark:text-white shadow-lg px-6 py-3 flex justify-between items-center transition-colors duration-300">
        
        {/* Logo */}
        <Link to="/" className="flex justify-center items-center gap-2">
          <img src={logo} alt="logo" className="size-8" />
          <h1 className="text-xl font-bold tracking-tight">
            MAPCANVAS
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className="hover:text-[#FF9B42] transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none"
            >
              <span className="block w-5 h-0.5 bg-current mb-1 transition-transform"></span>
              <span className="block w-5 h-0.5 bg-current mb-1 transition-transform"></span>
              <span className="block w-5 h-0.5 bg-current transition-transform"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Also Glassmorphism) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl overflow-hidden mt-2"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-lg font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;