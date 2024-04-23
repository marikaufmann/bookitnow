import { useQuery } from "react-query";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import StarRatingFilter from "../components/StarRatingFilter";
import TypeFilter from "../components/TypeFilter";
import { useSearchContext } from "../hooks/use-search-context";
import * as apiClient from "../api-client";
import { useState } from "react";
import { ArrowUpDown, Loader } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import SearchResultCard from "../components/SearchResultCard";
import {
  HotelSearchResponseType,
  HotelType,
} from "../../../backend/src/shared/types";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
const Search = () => {
  const search = useSearchContext();
  const location = useLocation();
  const type = location?.state?.initType ? location?.state?.initType : "";
  const [page, setPage] = useState<number>(1);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([type]);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedMinPrice, setSelectedMinPrice] = useState<
    number | undefined
  >();
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<
    number | undefined
  >();
  const [sortOption, setSortOption] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    rooms: search.rooms.toString(),
    page: page.toString(),
    facilities: selectedFacilities,
    types: selectedTypes,
    stars: selectedStars,
    minPrice: selectedMinPrice?.toString(),
    maxPrice: selectedMaxPrice?.toString(),
    sortOption,
  };
  const { data: hotelData, isLoading } = useQuery<HotelSearchResponseType>(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams)
  );
  const handleFacilities = (e: React.ChangeEvent<HTMLInputElement>) => {
    const facility = e.target.value;
    setSelectedFacilities((prevFacilities) =>
      e.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };
  const handleTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value;
    setSelectedTypes((prevTypes) =>
      e.target.checked
        ? [...prevTypes, type]
        : prevTypes.filter((prevType) => prevType !== type)
    );
  };
  const handleStars = (e: React.ChangeEvent<HTMLInputElement>) => {
    const star = e.target.value;
    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, star]
        : prevStars.filter((prevStar) => prevStar !== star)
    );
  };
  const handlePrice = (value: number[]) => {
    const [MIN, MAX] = value;
    setSelectedMinPrice(MIN);
    setSelectedMaxPrice(MAX);
  };
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 sm:px-4 px-1">
      <div className="min-h-screen laptop:py-10 py-48">
        <div className="flex gap-4">
          <div className=" w-full flex flex-col  border border-gray-200 rounded-lg flex-[25%] h-fit shadow">
            <div className="divide-y divide-gray-200">
              <h3 className="font-semibold px-2 py-4">Filter by:</h3>
              <FacilitiesFilter
                onChange={handleFacilities}
                selectedFacilities={selectedFacilities}
              />
              <TypeFilter
                onChange={handleTypes}
                selectedTypes={selectedTypes}
              />
              <StarRatingFilter
                onChange={handleStars}
                selectedStars={selectedStars}
              />
              <PriceFilter onChange={handlePrice} />
            </div>
          </div>
          <div className="flex-[75%] h-full flex flex-col">
            <h1 className="font-bold text-xl">
              {search.destination ? `${search.destination}:` : ""}
              <span>
                {hotelData
                  ? ` ${hotelData.pagination.total} ${
                      hotelData.pagination.total === 1
                        ? "property"
                        : "properties"
                    } found`
                  : ""}
              </span>
            </h1>
            <label className="border py-2 px-3 mt-3 rounded-full w-fit border-gray-300 flex items-center active:scale-[96%] transition-all ease-out ">
              <p className="flex items-center text-sm mr-1 text-gray-700">
                <ArrowUpDown className="w-4 h-4 mr-1" />
                Sort by:
              </p>
              <select
                className="text-sm border-none bg-transparent w-fit outline-none remove-default"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Our top picks</option>
                <option value="starRating">Property rating</option>
                <option value="pricePerNightAsc">Price per night (Low)</option>
                <option value="pricePerNightDesc">
                  Price per night (High)
                </option>
              </select>
              <ChevronsUpDown className="w-4 h-4 ml-2" />
            </label>
            <div className="mt-5 mb-10 flex flex-col gap-4">
              {hotelData?.data.map((hotel: HotelType) => (
                <div key={hotel._id}>
                  <SearchResultCard hotel={hotel} />
                </div>
              ))}
            </div>
            {isLoading ? (
              <div className="flex  justify-center items-center">
                <Loader className=" animate-spin text-gray-500 " />
              </div>
            ) : !hotelData || hotelData.pagination.total < 1 ? (
              <p className="flex  justify-center items-center font-semibold">
                No such properties found...
              </p>
            ) : (
              <Pagination
                page={hotelData?.pagination.page || 1}
                pages={hotelData?.pagination.pages || 1}
                onChangePage={(page: number) => {
                  setPage(page);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
