import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

const features = [
  {
    title: "Create Custom Maps",
    description:
      "Choose from clean, bold, and artistic styles to match the mood of your memory.",
    accent: "Style-first",
  },
  {
    title: "Location Search",
    description:
      "Quickly find a city, street, or landmark and turn it into a poster-ready composition.",
    accent: "Fast results",
  },
  {
    title: "Personalization",
    description:
      "Add names, coordinates, dates, and colors so every design feels unmistakably yours.",
    accent: "Made personal",
  },
  {
    title: "High-Quality Export",
    description:
      "Download crisp, print-friendly artwork that is ready for framing or gifting.",
    accent: "Print-ready",
  },
];

const heroStats = [
  { value: "4+", label: "Poster styles" },
  { value: "100%", label: "Customizable" },
  { value: "1 click", label: "Instant preview" },
];

const steps = [
  {
    number: "01",
    title: "Search for a location",
    description: "Enter any place you want to turn into a poster.",
  },
  {
    number: "02",
    title: "Customize your design",
    description: "Choose styles, colors, and add personal touches.",
  },
  {
    number: "03",
    title: "Download your poster",
    description: "Save your design and print or share it.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function FeatureCard({ title, description, accent, index }) {
  return (
    <motion.article
      custom={0.3 + index * 0.08}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -10, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group rounded-[2rem] border border-gray-200/80 dark:border-gray-800 bg-white/85 dark:bg-white/5 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex rounded-full bg-[#FF9B42]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#C76614] dark:text-[#FFB36E]">
          {accent}
        </span>
        <motion.div
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-md"
          whileHover={{ rotate: 6 }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
        >
          {index + 1}
        </motion.div>
      </div>

      <h3
        className="mt-6 text-2xl leading-snug"
        style={{ fontFamily: "'Playfair Display', 'serif'" }}
      >
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </motion.article>
  );
}

function HomePage() {
  return (
    <main className="pt-28 pb-16">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-gray-200/80 dark:border-gray-800 bg-[radial-gradient(circle_at_top_left,_rgba(255,155,66,0.22),_transparent_32%),linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(249,244,239,0.95))] px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,155,66,0.16),_transparent_30%),linear-gradient(135deg,_rgba(10,10,10,0.98),_rgba(22,22,22,0.98))] md:px-10 md:py-12">
        <div className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-[#FF9B42]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-black/8 blur-3xl dark:bg-white/8" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <motion.p
              className="inline-flex rounded-full border border-[#FF9B42]/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C76614] dark:bg-white/8 dark:text-[#FFB36E]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Custom map art for meaningful places
            </motion.p>

            <motion.h1
              className="mt-6 text-4xl leading-tight md:text-6xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Turn your favorite places into polished map posters.
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-8 text-gray-700 dark:text-gray-300 md:text-lg"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.18}
            >
              Design personalized prints from anywhere in the world with a
              cleaner workflow, richer styling, and details that make each map
              feel personal.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-4 sm:flex-row"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.26}
            >
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/editor"
                  className="inline-flex items-center justify-center rounded-[1.25rem] bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-colors duration-300 hover:bg-[#FF9B42] dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-[#FF9B42]"
                >
                  Create Your Map
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-[1.25rem] border border-gray-300/80 bg-white/70 px-6 py-3 text-sm font-semibold text-gray-900 backdrop-blur-sm transition-colors duration-300 hover:border-[#FF9B42] hover:text-[#C76614] dark:border-gray-700 dark:bg-white/5 dark:text-white dark:hover:text-[#FFB36E]"
                >
                  See How It Works
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.34}
            >
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                >
                  <p
                    className="text-2xl"
                    style={{ fontFamily: "'Playfair Display', 'serif'" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[#FF9B42]/20 blur-3xl" />

            <motion.div
              whileHover={{ y: -8, rotate: -1 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[#181818] p-3 shadow-2xl dark:border-white/10"
            >
              <img
                src={heroImage}
                alt="MapCanvas poster preview"
                className="h-full w-full rounded-[1.4rem] object-cover"
              />

              <motion.div
                whileHover={{ x: 4 }}
                className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] bg-white/88 p-5 text-black shadow-lg backdrop-blur-md dark:bg-black/72 dark:text-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
                  Featured layout
                </p>
                <h2
                  className="mt-3 text-2xl"
                  style={{ fontFamily: "'Playfair Display', 'serif'" }}
                >
                  Build a poster that feels gallery-ready.
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  Clean typography, balanced framing, and map styling that keeps
                  the place itself front and center.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mt-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          custom={0}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
            What is MapCanvas?
          </p>
          <h2
            className="mt-4 text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', 'serif'" }}
          >
            A creative way to turn locations into keepsake artwork.
          </h2>
          <p className="mt-5 text-base leading-8 text-gray-700 dark:text-gray-300 md:text-lg">
            MapCanvas helps you transform hometowns, travel destinations, and
            milestone locations into elegant visual pieces you can print, gift,
            or keep close.
          </p>
        </motion.div>
      </section>

      <section className="mt-18">
        <div className="flex items-end justify-between gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={0.05}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
              Features you&apos;ll love
            </p>
            <h2
              className="mt-3 text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Designed to feel smooth from first click to final export.
            </h2>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} index={index} {...feature} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
            How it works
          </p>
          <h2
            className="mt-4 text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', 'serif'" }}
          >
            Create Your Map in 3 Easy Steps
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.08 + index * 0.08}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-[2rem] border border-gray-200/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(249,244,239,0.92))] p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))]"
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className="text-4xl leading-none text-black/85 dark:text-white/85"
                  style={{ fontFamily: "'Playfair Display', 'serif'" }}
                >
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#FF9B42] to-transparent" />
              </div>

              <h3
                className="mt-6 text-2xl"
                style={{ fontFamily: "'Playfair Display', 'serif'" }}
              >
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.05}
          className="relative overflow-hidden rounded-[2.5rem] bg-black px-8 py-12 text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)] dark:bg-white dark:text-black md:px-12"
        >
          <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-[#FF9B42]/35 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-3xl dark:bg-black/10" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFB36E] dark:text-[#C76614]">
                Ready to start?
              </p>
              <h2
                className="mt-4 text-3xl md:text-4xl"
                style={{ fontFamily: "'Playfair Display', 'serif'" }}
              >
                Start Creating Your Own Map Poster Today
              </h2>
              <p className="mt-5 text-base leading-8 text-white/80 dark:text-black/75 md:text-lg">
                Bring your memories to life with a custom-designed map. It is
                simple, creative, and made just for you.
              </p>
            </div>

            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/editor"
                className="inline-flex items-center justify-center rounded-[1.25rem] bg-[#FF9B42] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FF9B42]/25 transition-colors duration-300 hover:bg-white dark:hover:bg-black dark:hover:text-white"
              >
                Create Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default HomePage;
