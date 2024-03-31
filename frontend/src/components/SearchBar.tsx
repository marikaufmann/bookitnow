import { FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../hooks/use-search-context";
import { BedDouble } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { UserRound } from "lucide-react";
import DatePicker from "react-datepicker";
import debounce from "lodash.debounce";
import "react-datepicker/dist/react-datepicker.css";
import { useOnClickOutside } from "../hooks/use-on-click-outside";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import { HotelType } from "../../../backend/src/shared/types";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [isCountOpen, setIsCountOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const countRef = useRef(null);
  useOnClickOutside(countRef, () => {
    setIsCountOpen(false);
  });
  const destinationRef = useRef(null);
  useOnClickOutside(destinationRef, () => {
    setIsDestinationOpen(false);
  });
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const { data: fetchedDestinations, refetch } = useQuery<HotelType[]>(
    "searchDestination",
    () => apiClient.fetchDestinations(destination),
    { enabled: !!destination }
  );

  const filteredDestinations: HotelType[] = [];
  fetchedDestinations?.filter((fetchedDestination) => {
    const isDuplicate = filteredDestinations.find(
      (filteredDestination) =>
        filteredDestination.city === fetchedDestination.city
    );
    if (!isDuplicate) {
      filteredDestinations.push(fetchedDestination);
      return true;
    }
    return false;
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    search?.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const request = debounce(async () => {
    refetch();
  }, 300);
  const debounceRequest = useCallback(() => {
    request();
  }, []);

  return (
    <div className="absolute max-w-7xl mx-auto w-full inset-x-0 laptop:top-[320px] top-[300px] px-4">
      <div className="bg-bg rounded-lg laptop:h-14  mx-4 flex border-[#c99284] shadow-2xl ">
        <form
          action=""
          className="flex h-full laptop:flex-row flex-col w-full laptop:gap-3 gap-2 p-2"
        >
          <label
            ref={destinationRef}
            id='destination'
            htmlFor=""
            className="bg-[#a6c4d8]/20 rounded-md flex items-center h-full  flex-1 px-2 max-lg:text-sm relative max-laptop:w-full py-3 z-50"
          >
            <BedDouble className="absolute text-gray-400 w-5 h-5" />
            <input
              onClick={() => setIsDestinationOpen(true)}
              className="ml-7 bg-transparent flex focus:outline-none text-title  w-full"
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                debounceRequest();
              }}
              placeholder="Where are you going?"
            />
            {isDestinationOpen && (
              <>
                {destination && filteredDestinations && (
                  <div className="absolute bg-bg w-full -left-2 laptop:mt-14 mt-12 align-start top-0 rounded-md flex flex-col h-fit shadow-lg p-2 gap-1 z-50">
                    {filteredDestinations?.map((destination) => (
                      <div
                        className="cursor-pointer hover:bg-[#a6c4d8]/10  rounded p-2 text-title"
                        onClick={() => {
                          setIsDestinationOpen(false);
                          setDestination(destination.city);
                        }}
                      >
                        {destination.city}, {destination.country}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </label>
          <label className="w-full py-3 cursor-pointer laptop:w-[180px] bg-[#a6c4d8]/20 rounded-md relative pl-2 flex items-center max-lg:text-sm ">
            <CalendarDays className="absolute text-gray-400 w-5 h-5" />
            <DatePicker
              portalId="root-portal"
              selected={checkIn}
              onChange={(date: Date) => setCheckIn(date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check in date"
              className="min-w-full bg-transparent rounded-md focus:outline-none ml-7 text-title"
              wrapperClassName="min-w-full"
            />
          </label>
          <label
            htmlFor=""
            className="w-full py-3 cursor-pointer laptop:w-[180px] bg-[#a6c4d8]/20 rounded-md pl-2 flex items-center max-lg:text-sm"
          >
            <div className="w-full">
              <CalendarDays className="absolute text-gray-400 w-5 h-5" />
              <DatePicker
                portalId="root-portal"
                selected={checkOut}
                onChange={(date: Date) => setCheckOut(date as Date)}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check out date"
                className="min-w-full bg-transparent rounded-md focus:outline-none ml-7 text-title"
                wrapperClassName="min-w-full"
              />
            </div>
          </label>
          <label
            htmlFor=""
            className="laptop:w-[220px] flex bg-[#a6c4d8]/20 relative rounded-lg items-center pl-2 w-full py-3"
          >
            <div
              className="h-full flex w-full items-center cursor-pointer relative"
              onClick={() => setIsCountOpen(true)}
            >
              <UserRound className="absolute text-gray-400 w-5 h-5" />
              <p className="text-gray-400 ml-6 max-lg:text-sm">Guests</p>
            </div>
            {isCountOpen && (
              <div
                ref={countRef}
                className="absolute bg-bg laptop:w-[300px] w-full laptop:-right-2 laptop:mt-14 mt-12 align-end top-0 rounded-lg flex flex-col h-[200px] shadow-lg p-6 gap-5 z-50"
              >
                <div className="flex  justify-between items-center">
                  <h3 className="text-title">Adults</h3>
                  <div className="border border-gray-300 flex laptop:w-[120px] w-[220px] justify-between items-center p-2 rounded">
                    <button
                      className="w-[30px] text-gray-500 scale-125 disabled:text-gray-200"
                      onClick={(e) => {
                        e.preventDefault();
                        setAdultCount((prev) => prev - 1);
                      }}
                      disabled={adultCount === 1}
                    >
                      —
                    </button>
                    <p className="text-title font-semibold">{adultCount}</p>
                    <button
                      className="w-[30px] text-gray-500 scale-125"
                      onClick={(e) => {
                        e.preventDefault();
                        setAdultCount((prev) => prev + 1);
                      }}
                    >
                      ＋
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-title">Children</h3>
                  <div className="border border-gray-300 flex laptop:w-[120px] justify-between items-center p-2 rounded w-[220px] ">
                    <button
                      className="w-[30px] text-gray-500 scale-125 disabled:text-gray-200"
                      onClick={(e) => {
                        e.preventDefault();
                        setChildCount((prev) => prev - 1);
                      }}
                      disabled={childCount === 0}
                    >
                      —
                    </button>
                    <p className="text-title font-semibold">{childCount}</p>
                    <button
                      className="w-[30px] text-gray-500 scale-125"
                      onClick={(e) => {
                        e.preventDefault();
                        setChildCount((prev) => prev + 1);
                      }}
                    >
                      ＋
                    </button>
                  </div>
                </div>
                <button
                  className="w-full border border-primary rounded py-1 text-primary hover:bg-mutedbgblue"
                  onClick={() => setIsCountOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </label>
          <button
            className="laptop:w-[150px] w-full bg-primary rounded-lg font-semibold text-bg hover:bg-primary/80 py-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
