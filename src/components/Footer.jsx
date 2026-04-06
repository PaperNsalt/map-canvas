import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Editor", to: "/editor" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
];

const supportLinks = [
  { label: "Contact", href: "mailto:jeremyrellama17@gmail.com" },
  { label: "Help Center", href: "mailto:jeremyrellama17@gmail.com" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/JEREMY.RELLAMA17/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <path d="M13.46 21v-7.25h2.43l.36-2.82h-2.8V9.13c0-.82.23-1.37 1.41-1.37h1.5V5.23c-.26-.04-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.76v2.05H8v2.82h2.49V21h2.97Z" />
      </svg>
    ),
  },
  {
    label: "Github",
    href: "https://github.com/PaperNsalt",
    icon: (
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeremy-rellama-39292a339/",
    icon: (
     <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM6 13h-2v-7h2v7zM5 5c-0.553 0-1-0.447-1-1s0.447-1 1-1c0.553 0 1 0.447 1 1s-0.447 1-1 1zM13 13h-2v-4c0-0.553-0.447-1-1-1s-1 0.447-1 1v4h-2v-7h2v1.241c0.412-0.566 1.044-1.241 1.75-1.241 1.244 0 2.25 1.119 2.25 2.5v4.5z"></path></svg>
    ),
  },
];

function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(248,243,237,0.95))] dark:border-white/10 dark:bg-[linear-gradient(180deg,_rgba(12,12,12,0.96),_rgba(20,20,20,0.98))]">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#C76614] dark:text-[#FFB36E]">
              MapCanvas
            </p>
            <h2
              className="mt-4 text-3xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Turn meaningful places into art worth keeping.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-gray-700 dark:text-gray-300">
              Create custom map posters for your home, gifts, special dates,
              favorite trips, and every location that deserves a beautiful
              story.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex size-11 items-center justify-center rounded-2xl border border-gray-200 bg-white/80 text-gray-700 shadow-sm transition-colors duration-300 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-[#FFB36E]"
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="text-xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Explore
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base text-gray-700 transition-colors duration-300 hover:text-[#C76614] dark:text-gray-300 dark:hover:text-[#FFB36E]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="text-xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Connect
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {supportLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base text-gray-700 transition-colors duration-300 hover:text-[#C76614] dark:text-gray-300 dark:hover:text-[#FFB36E]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-gray-200/80 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C76614] dark:text-[#FFB36E]">
                Contact
              </p>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                hello@mapcanvas.co
                <br />
                Designed for memorable places and modern poster lovers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200/80 pt-6 text-sm text-gray-600 dark:border-white/10 dark:text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 MapCanvas. All rights reserved.</p>
          <p>Made for stories, souvenirs, and spaces that feel personal.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
