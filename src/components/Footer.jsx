import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Editor", to: "/editor" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
];

const supportLinks = [
  { label: "Contact", href: "mailto:hello@mapcanvas.co" },
  { label: "Help Center", href: "mailto:support@mapcanvas.co" },
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
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <path d="M13.46 21v-7.25h2.43l.36-2.82h-2.8V9.13c0-.82.23-1.37 1.41-1.37h1.5V5.23c-.26-.04-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.76v2.05H8v2.82h2.49V21h2.97Z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <path d="M12 3.2c-4.78 0-7.2 3.42-7.2 6.27 0 1.73.66 3.28 2.08 3.86.23.1.44 0 .5-.24.05-.18.16-.64.21-.83.07-.24.04-.32-.15-.56-.42-.5-.68-1.14-.68-2.05 0-2.64 1.98-5 5.15-5 2.8 0 4.33 1.71 4.33 4 0 3.01-1.33 5.55-3.3 5.55-1.09 0-1.9-.9-1.64-2 .31-1.3.9-2.7.9-3.64 0-.84-.45-1.54-1.38-1.54-1.09 0-1.96 1.13-1.96 2.64 0 .96.32 1.6.32 1.6l-1.3 5.48c-.38 1.61-.06 3.58-.03 3.78.02.12.16.15.22.06.1-.13 1.34-1.66 1.76-3.2.12-.43.67-2.62.67-2.62.33.63 1.3 1.19 2.33 1.19 3.07 0 5.15-2.8 5.15-6.55 0-2.84-2.41-5.48-6.08-5.48Z" />
      </svg>
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
