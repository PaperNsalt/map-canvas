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
    <nav className="bg-[#FF9B42] dark:bg-black rounded-full text-white shadow-md mt-4">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex justify-center items-center gap-2">
        <img src={logo} alt="logo"  className="size-10"/>
        <h1 className="text-xl font-bold tracking-tighter">
          MAPCANVAS
        </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className="hover:text-blue-400 transition"
              >
                {link.name}
              </Link>

              
            </motion.div>
          ))}<ThemeToggle></ThemeToggle>
        </div>

        

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#FF9B42] dark:bg-gray-800 px-4 pb-4 shadow-lg rounded-b-xl"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="py-2"
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-blue-400"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;