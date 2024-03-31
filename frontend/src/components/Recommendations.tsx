import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HotelType } from "../../../backend/src/shared/types";
import { Star } from "lucide-react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useWindowDimentions from "../hooks/use-window-dimentions";
const Recommendations = ({ hotels }: { hotels: HotelType[] }) => {
  const navigate = useNavigate();
  const sortedHotels = hotels.sort((a, b) => {
    return b.starRating - a.starRating;
  });
  const { width } = useWindowDimentions();
  return (
    <div className="mt-10">
      <h1 className="text-title md:text-3xl text-xl font-bold mb-4">
        Holiday recommendations for you
      </h1>
      <Swiper
        cssMode={true}
        slidesPerView={width > 900 ? 3.5 : 2.5}
        spaceBetween={25}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}
        className=" flex gap-2"
      >
        {sortedHotels.map((hotel) => (
          <SwiperSlide
            className=" md:h-[270px] h-[310px]  rounded-md  flex-1 "
            key={hotel._id}
          >
            <Swiper
              cssMode={true}
              pagination={{ clickable: true }}
              mousewheel={true}
              keyboard={true}
              modules={[Pagination, Mousewheel, Keyboard]}
              className="mySwiper rounded-md sww hover:shadow-2xl cursor-pointer overflow-hidden"
              onClick={() => navigate(`/details/${hotel._id}`)}
            >
              <SwiperSlide
                className=" w-full  min-w-[200px]
              h-[150px] rounded-md "
              >
                <img
                  src={hotel.imageUrls[0]}
                  alt=""
                  className=" object-cover object-center  h-full w-full hover:scale-[104%] transition-all ease-out "
                />
              </SwiperSlide>
              <SwiperSlide
                className=" w-full min-w-[200px]
              h-[150px]"
              >
                <img
                  src={hotel.imageUrls[1]}
                  alt=""
                  className=" object-cover object-center rounded-md h-full w-full hover:scale-[104%] transition-all ease-ou"
                />
              </SwiperSlide>
              <SwiperSlide
                className=" w-full  min-w-[200px]
              h-[150px] rounded-md"
              >
                <img
                  src={hotel.imageUrls[2]}
                  alt=""
                  className=" object-cover object-center rounded-md h-full w-full hover:scale-[104%] transition-all ease-ou"
                />
              </SwiperSlide>
            </Swiper>

            <div className="p-2 ">
              <div
                onClick={() => navigate(`/details/${hotel._id}`)}
                className="cursor-pointer text-title font-semibold text-sm md:h-[50px] h-[42px]"
              >
                <h3 className="line-clamp-2">{hotel.name}</h3>
              </div>
              <div className="flex md:justify-between  md:flex-row flex-col max-md:gap-1">
                <div className="text-xs text-gray-800 flex items-center ">
                  {Array.from({ length: hotel.starRating }).map((_, index) => (
                    <div key={index}>
                      <Star className="w-3 h-3 md:w-4 md:h-4  fill-yellow-400  text-yellow-400" />
                    </div>
                  ))}
                  {/* {hotel.starRating} Rating */}
                </div>
                <div className="text-xs text-gray-800 flex items-center ">
                  <MapPin className="w-4 h-4   text-red-400" /> {hotel.city}
                </div>
                <div className="text-xs font-semibold text-title relative ">
                  ${hotel.pricePerNight}/
                  <span className="text-xs font-normal  text-gray-600">
                    {"  "} Night
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommendations;
