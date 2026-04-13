import { motion } from "framer-motion";

function AboutPoster() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      whileHover={{ y: -10, rotate: -1.4, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[#FF9B42]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-4 top-12 h-28 w-28 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/60 bg-[#171717] p-3 shadow-2xl dark:border-white/10">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,_#f8f2eb,_#efe5da)] p-5 dark:bg-[linear-gradient(180deg,_#111111,_#191919)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,155,66,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.08),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,155,66,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_28%)]" />

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[1.45rem] border border-black/10 bg-[linear-gradient(180deg,_#1C1C1C,_#0C0C0C)] px-6 pb-6 pt-8 text-white dark:border-white/10"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-10 h-44 w-44 -translate-x-1/2 rounded-full bg-[#FF9B42]/16 blur-3xl"
            />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[#FFB36E]">
                  Signature poster
                </p>
                <h2
                  className="mt-3 text-4xl"
                  style={{ fontFamily: "'Playfair Display', 'serif'" }}
                >
                  Barcelona
                </h2>
              </div>

              <motion.div
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-white/82"
              >
                Curated
              </motion.div>
            </div>

            <div className="relative mt-8 flex h-[18rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(255,155,66,0.18),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.01))]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="absolute h-[15rem] w-[15rem] rounded-full border border-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="absolute h-[11rem] w-[11rem] rounded-full border border-white/10"
              />

              <svg
                viewBox="0 0 320 320"
                className="absolute inset-0 h-full w-full opacity-90"
                aria-hidden="true"
              >
                <path
                  d="M52 140 C92 100, 126 120, 156 168 S232 226, 274 190"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="2.4"
                />
                <path
                  d="M60 222 C102 184, 144 240, 196 202 S244 160, 282 178"
                  fill="none"
                  stroke="rgba(255,255,255,0.13)"
                  strokeWidth="2"
                />
                <path
                  d="M82 88 C128 124, 176 88, 222 126 S250 174, 274 162"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                />
                <circle
                  cx="176"
                  cy="162"
                  r="42"
                  fill="rgba(255,155,66,0.10)"
                  stroke="rgba(255,179,110,0.64)"
                  strokeWidth="2"
                />
              </svg>

              <motion.div
                animate={{
                  x: [0, 5, 0, -5, 0],
                  y: [0, -4, 0, 4, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#FFB36E]/55 bg-[#FF9B42] text-black shadow-[0_10px_30px_rgba(255,155,66,0.34)]"
              >
                <span className="text-sm font-bold">MC</span>
              </motion.div>
            </div>

            <div className="relative z-10 mt-7 flex items-end justify-between gap-6">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/48">
                  Coordinates
                </p>
                <p className="mt-2 text-sm tracking-[0.18em] text-white/84">
                  41.3874 N / 2.1686 E
                </p>
              </div>

              <div className="text-right">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/48">
                  Mood
                </p>
                <p
                  className="mt-2 text-2xl"
                  style={{ fontFamily: "'Playfair Display', 'serif'" }}
                >
                  Warm Horizons
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ x: 4 }}
            className="relative mt-4 rounded-[1.4rem] border border-black/8 bg-white/85 p-4 text-black shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/72 dark:text-white"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C76614] dark:text-[#FFB36E]">
              Motion preview
            </p>
            <p
              className="mt-2 text-xl"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              An expressive poster with subtle living movement.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function AboutPage() {
  const highlights = [
    {
      title: "Designed for meaningful places",
      description:
        "MapCanvas helps turn the places that matter most into artwork you can keep, share, and proudly display.",
    },
    {
      title: "Simple but expressive",
      description:
        "From clean minimal layouts to bold poster styles, every design is made to feel personal without being hard to build.",
    },
    {
      title: "Made for memories",
      description:
        "Celebrate a hometown, first date, graduation, dream trip, or any location that tells part of your story.",
    },
  ];

  return (
    <main className="pt-28 pb-16">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-[0.35em] text-sm text-[#FF9B42] font-semibold">
            About MapCanvas
          </p>

          <motion.h1
            className="text-5xl md:text-6xl leading-tight mt-4"
            style={{ fontFamily: "'Playfair Display', 'serif'" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            We turn special locations into modern wall art.
          </motion.h1>

          <p className="text-base md:text-lg mt-6 text-gray-700 dark:text-gray-300 leading-8">
            MapCanvas is built for people who want more than a plain screenshot
            of a map. We help you transform real places into beautiful poster
            designs that feel thoughtful, personal, and ready to frame.
          </p>

          <p className="text-base mt-4 text-gray-700 dark:text-gray-300 leading-8">
            Whether it is the city where you grew up, the beach where you got
            engaged, or the destination of your favorite trip, MapCanvas makes
            it easy to capture that memory in a style that fits your space.
          </p>
        </div>

        <AboutPoster />
      </section>

      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/40 backdrop-blur-sm p-8 shadow-sm"
          >
            <h2
              className="text-2xl mb-4"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              {item.title}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-7">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-20 rounded-[2.5rem] bg-black text-white dark:bg-white dark:text-black px-8 md:px-12 py-12">
        <h2
          className="text-3xl md:text-4xl"
          style={{ fontFamily: "'Playfair Display', 'serif'" }}
        >
          Why we made it
        </h2>

        <p className="mt-6 text-base md:text-lg leading-8 max-w-3xl">
          Great memories deserve better presentation. MapCanvas was created to
          make custom map art feel accessible, creative, and genuinely special,
          so anyone can design something worth printing in just a few steps.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;
