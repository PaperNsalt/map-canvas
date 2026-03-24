function HomePage() {
  function Test({ logo, text, sub }) {
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        {logo && <img src={logo} alt="img" />}
        <p>{text}</p>
        <p>{sub}</p>
      </div>
    );
  }
  return (
    <>
      <section className="pt-20">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex justify-center items-start flex-col">
            <h1
              className="text-[3.6rem] font-medium leading-16"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Turn Your Favorite Places into Stunning Map Posters
            </h1>

            <p className="text-base mt-6">
              Design personalized map posters from anywhere in the world.
              Customize styles, colors, and details to create a unique piece of
              art that captures your special memories.
            </p>

            <button className="px-4 py-2 bg-black dark:bg-white rounded-b-2xl rounded-r-2xl text-white dark:text-black mt-6">
              Create Your Map
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="bg-black rounded-4xl w-full h-full"></div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex justify-center items-center">
          <h1
            className="text-[2rem]"
            style={{ fontFamily: "'Playfair Display', 'serif'" }}
          >
            What is MapCanvas?
          </h1>
        </div>

        <div>
          <p className="text-base text-center">
            MapCanvas is a creative platform that allows you to transform
            real-world locations into beautiful, customizable posters. Whether
            it’s your hometown, a travel destination, or a special place,
            MapCanvas helps you turn meaningful locations into elegant visual
            designs.
          </p>
        </div>
      </section>

      <section>
        <div>
          <div>
            <h1
              className="text-[2rem] text-center"
              style={{ fontFamily: "'Playfair Display', 'serif'" }}
            >
              Features You'll Love
            </h1>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 p-8">
            <Test
              logo="/icon.png"
              text="Create Custom Maps"
              sub="Choose from a variety of themes like dark, light, minimal, and artistic styles."
            />

            <Test
              logo="/icon.png"
              text="Location Search"
              sub="Quickly find any place around the world and generate a map instantly."
            />

            <Test
              logo="/icon.png"
              text="Personalization"
              sub="Add custom text, coordinates, and adjust colors to match your style."
            />

            <Test
              logo="/icon.png"
              text="High-Quality Export"
              sub="Download your design as a high-resolution image ready for printing."
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
