import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import EditorPage from "./pages/Editor";
import GalleryPage from "./pages/Gallery";
import AboutPage from "./pages/About";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

import "./App.css";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      {/* ADDED: A wrapper div that controls the global background and text color */}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <Navbar />

        {/* Added a container for your routes to keep them neat */}
        <main className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="editor" element={<EditorPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="about" element={<AboutPage />} />

            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
