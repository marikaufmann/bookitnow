import { Star } from "lucide-react";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

const SearchResultCard = ({ hotel }: { hotel: HotelType }) => {
  return (
    <div className="flex sm:p-3 p-1 rounded-xl border border-gray-200 sm:h-[240px] h-[150px] gap-4 shadow">
      <div className="flex-[35%]">
        <img
          src={hotel.imageUrls[0]}
          alt=""
          className="rounded-md w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex-[65%] flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-1">
            <Link
              to={`/details/${hotel._id}`}
              className="font-bold sm:text-xl text-lg text-primary max-sm:line-clamp-2"
            >
              {hotel.name}
            </Link>
            <div className="flex mt-1">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <div key={index}>
                  <Star className="w-3 h-3 md:w-4 md:h-4  fill-yellow-400  text-yellow-400" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-primary text-xs -mt-1 mb-1 font-semibold sm:flex hidden">
            <span className="underline">{hotel.city}</span>
            <span> &nbsp;•&nbsp;</span>
            <span className="underline">{hotel.country}</span>
          </p>
          <p className="max-w-[270px] md:max-w-[440px] text-xs text-gray-700 sm:line-clamp-3 line-clamp-2 lg:line-clamp-4 leading-5">
            {hotel.description}
          </p>
        </div>
        <Link
          className="w-fit self-end sm:px-3 hover:shadow-md bg-primary rounded-lg font-semibold text-bg hover:bg-primary/80 sm:py-2 py-1 px-2"
          to={`/details/${hotel._id}`}
        >
          Show prices
        </Link>
      </div>
    </div>
  );
};

export default SearchResultCard;
