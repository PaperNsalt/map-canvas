


function HomePage(){
  return(
    <>
    <section>
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className="flex justify-center items-start flex-col">
        <h1 className="text-4xl font-bold tracking-tighter">
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

    <section>
      <div>

      </div>
    </section>

    </>
  );
}

export default HomePage;