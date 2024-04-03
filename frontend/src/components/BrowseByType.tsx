import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PopularTypes } from "../config/hotel-options-config";
import useWindowDimentions from "../hooks/use-window-dimentions";
import { useNavigate } from "react-router-dom";
const CLOUDINARY_TYPES_URL = import.meta.env.VITE_CLOUDINARY_TYPES_URL;

const BrowseByType = () => {
  const { width } = useWindowDimentions();
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <h1 className="text-title md:text-3xl text-xl font-bold mb-4">
        Browse by property type
      </h1>

      <Swiper
        cssMode={true}
        slidesPerView={width > 850 ? 3.5 : 2.5}
        spaceBetween={25}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}
        className="flex gap-2"
      >
        {PopularTypes.map((type) => (
          <SwiperSlide
            onClick={() => navigate("/search", { state: { initType: type } })}
            key={type}
            className="rounded-md hover:shadow-2xl overflow-hidden"
          >
            <div className="md:h-[140px] h-[100px] relative ">
              <img
                src={`${CLOUDINARY_TYPES_URL}/${type
                  .toLowerCase()
                  .replace(" ", "_")}.jpg`}
                alt=""
                className="w-full h-full cursor-pointer object-cover object-center hover:scale-[104%] transition-all ease-out"
              />
              <div className="absolute h-[30px] inset-x-0 bottom-0 right-0 left-0 bg-black/50 rounded-b-md ">
                <h3 className=" cursor-pointer text-bg flex ml-2 mt-1 font-semibold ">
                  {type}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrowseByType;
