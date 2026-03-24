


function HomePage(){
  return(
    <>
    <section className="pt-20">
    <div className="grid grid-cols-2 gap-8">
      <div className="flex justify-center items-start flex-col">
        <h1 className="text-[3.6rem] font-medium leading-16" style={{ fontFamily: "'Playfair Display', 'serrif'" }}>
          Turn Your Favorite Places into Stunning Map Posters
        </h1>

        <p className="text-base mt-6">Design personalized map posters from anywhere in the world. Customize styles, colors, and details to create a unique piece of art that captures your special memories.</p>

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
        <h1 className="text-[2rem]" style={{ fontFamily: "'Playfair Display', 'serif'" }}>What is MapCanvas?</h1>
      </div>

      <div>
        <p className="text-base text-center">
          MapCanvas is a creative platform that allows you to transform real-world locations into beautiful, customizable posters. Whether it’s your hometown, a travel destination, or a special place, MapCanvas helps you turn meaningful locations into elegant visual designs.
        </p>
      </div>
    </section>

    <section>
      
    </section>

    </>
  );
}

export default HomePage;