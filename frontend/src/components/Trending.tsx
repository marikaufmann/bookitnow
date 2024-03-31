import * as apiClient from "../api-client.ts";

import { useQuery } from "react-query";
import { trendingCities } from "../config/hotel-options-config.ts";
const CLOUDINARY_DESTINATIONS_URL = import.meta.env.VITE_CLOUDINARY_DESTINATIONS_URL

const Trending = ({
  handleSearch,
}: {
  handleSearch: (destination: string) => void;
}) => {
  const { data: userLocation } = useQuery(
    "getUserLocation",
    apiClient.fetchUserLocation
  );
  const userCountry = userLocation?.country?.name;

  return (
    <div>
      <h1 className="text-title md:text-3xl text-xl font-bold mb-1">
        Trending destinations
      </h1>
      <div className="text-gray-600 mb-4 text-sm md:text-base">
        {!userCountry ? (
          "Most popular choices for travellers"
        ) : (
          <div>
            Most popular choices for travellers from{"  "}
            <span className="underline underline-offset-2 font-semibold">
              {userCountry}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full gap-2 ">
        <div className="flex gap-2 max-h-[240px] min-h-[180px]">
          <div
            className="rounded  relative  w-[50%] cursor-pointer hover:shadow-2xl overflow-hidden "
            onClick={() => {
              handleSearch(trendingCities[0]);
            }}
          >
            <h3 className="absolute top-5 left-3 font-bold text-gray-600 md:text-lg z-[50]">
              {trendingCities[0]} 🇬🇧
            </h3>
            <img
              src={`${CLOUDINARY_DESTINATIONS_URL}/${trendingCities[0].toLowerCase()}.jpg`}
              className="h-full w-full object-cover rounded hover:scale-[104%] transition-all ease-out"
              alt=""
            />
          </div>
          <div
            className="w-[50%] relative rounded cursor-pointer hover:shadow-2xl overflow-hidden"
            onClick={() => {
              handleSearch(trendingCities[1]);
            }}
          >
            <h3 className="absolute top-5 left-3 font-bold text-gray-600 md:text-lg z-[50]">
              {trendingCities[1]} 🇩🇪
            </h3>
            <img
              src={`${CLOUDINARY_DESTINATIONS_URL}/${trendingCities[1].toLowerCase()}.jpg`}
              className="h-full w-full object-cover rounded object-left-top hover:scale-[104%] transition-all ease-out"
              alt=""
            />
          </div>
        </div>
        <div className="flex  gap-2 min-h-[140px]">
          <div
            className="relative  rounded cursor-pointer hover:shadow-2xl overflow-hidden"
            onClick={() => {
              handleSearch(trendingCities[2]);
            }}
          >
            <h3 className="absolute top-5 left-3 font-bold text-bg md:text-lg z-[50]">
              {trendingCities[2]} 🇳🇱
            </h3>
            <img
              src={`${CLOUDINARY_DESTINATIONS_URL}/${trendingCities[2].toLowerCase()}.jpg`}
              alt=""
              className="h-full w-full object-cover rounded hover:scale-[104%] transition-all ease-out"
            />
          </div>
          <div
            className="relative rounded cursor-pointer hover:shadow-2xl  overflow-hidden"
            onClick={() => {
              handleSearch(trendingCities[3]);
            }}
          >
            <h3 className="absolute top-5 left-3 font-bold text-bg md:text-lg z-[50]">
              {trendingCities[3]} 🇮🇹
            </h3>
            <img
              src={`${CLOUDINARY_DESTINATIONS_URL}/${trendingCities[3].toLowerCase()}.jpg`}
              className="h-full w-full object-cover rounded hover:scale-[104%] transition-all ease-out"
              alt=""
            />
          </div>
          <div
            className="relative rounded cursor-pointer hover:shadow-2xl  overflow-hidden"
            onClick={() => {
              handleSearch(trendingCities[4]);
            }}
          >
            <h3 className="absolute top-5 left-4 font-bold text-gray-600 md:text-lg z-[50]">
              {trendingCities[4]} 🇨🇿
            </h3>
            <img
              src={`${CLOUDINARY_DESTINATIONS_URL}/${trendingCities[4].toLowerCase()}.jpg`}
              className="rounded h-full w-full object-cover hover:scale-[104%] transition-all ease-out"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
