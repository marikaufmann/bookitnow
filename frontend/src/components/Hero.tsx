
const Hero = () => {
  return (
    <div className="relative overflow-hidden h-[350px] z-100">
      <div className="h-full">
        <img
          src="/hero.jpg"
          alt="hero-image"
          className=" h-full w-full object-cover object-center md:hidden scale-150"
        />
        <img
          src="/hero.jpg"
          alt="hero-image"
          className=" h-full w-full object-cover hidden md:block object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute px-4 md:px-8 inset-x-0 top-20 md:top-16 z-30 w-full">
          <div className="max-w-[600px] text-center mx-auto flex justify-center items-center flex-col gap-3">
            <h1 className="text-bg text-4xl sm:text-5xl lg:text-6xl  font-[500] max-sm:w-[400px] font-logo">
              Book your perfect place to stay!
            </h1>
            <p className="tracking-wider text-bg font-light ">
              The best prices for over 2 million properties worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
