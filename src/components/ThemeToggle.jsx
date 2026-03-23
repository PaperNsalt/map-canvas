import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      onClick={toggleTheme}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        darkMode ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-md flex justify-center items-center"
        style={{ x: darkMode ? 24 : 0 }}
      >
        <span className="text-[10px]">{darkMode ? "🌙" : "☀️"}</span>
      </motion.div>
    </div>
  );
}

export default ThemeToggle;