const Hero = () => {
  return (
    <div className="relative overflow-hidden h-[370px] ">
      <div className="h-full">
        <img
          src="/hero.jpg"
          alt="hero-image"
          className=" h-full w-full object-cover object-center md:hidden scale-150"
        />
        <img
          src="/hero.jpg"
          alt="hero-image"
          className=" h-full w-full object-cover object-center hidden md:block"
        />
      </div>
    </div>
  );
};

export default Hero;
