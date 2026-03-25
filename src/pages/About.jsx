import { motion } from "framer-motion";
import heroImage from "../assets/hero.png";

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

        <div className="relative">
          <div className="absolute inset-0 bg-[#FF9B42]/20 blur-3xl rounded-[3rem]"></div>
          <img
            src={heroImage}
            alt="MapCanvas poster preview"
            className="relative w-full max-w-xl mx-auto rounded-[2rem] shadow-2xl object-cover"
          />
        </div>
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
