import { useEffect, useState } from "react";

const useWindowDimentions = () => {
  function getWindowDimentions () {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimentions, setWindowDimentions] = useState(
    getWindowDimentions()
  );
  useEffect(() => {
    const handleDimentionsChange = () => {
      setWindowDimentions(getWindowDimentions());
    };
    window.addEventListener("resize", handleDimentionsChange);
    return () => window.removeEventListener("resize", handleDimentionsChange);
  }, []);
  return windowDimentions;
};

export default useWindowDimentions;
