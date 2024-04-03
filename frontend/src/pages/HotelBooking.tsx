import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchContext } from "../hooks/use-search-context.tsx";
import { format } from "date-fns";
// import { useAppContext } from "../hooks/use-app-context.tsx";
const HotelBooking = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate()
  const search = useSearchContext();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    { enabled: !!hotelId }
  );
  if (!hotel) {
    navigate("/404");
    return "";
  }
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 sm:px-6 px-4 sm:py-4 py-2 min-h-screen ">
      <div className="flex gap-6 max-md:flex-col">
        <div className="flex-[35%] flex-col rounded-lg shadow-2xl border border-gray-200">
          <h1 className="p-4 font-bold text-xl text-title">Your booking</h1>
          <div className="p-4 -mt-2  flex flex-col divide-y divide-gray-200">
            <div className="flex flex-col">
              <h3 className="text-gray-600">Destination:</h3>
              <div className="font-semibold text-title pb-2">
                <p>{hotel.name}</p>
                <p>
                  {hotel.city}, {hotel.country}
                </p>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="flex-1 ">
                <h3 className="text-gray-600">Check-in</h3>
                <p className="font-semibold text-title">
                  {format(search.checkIn, "EEE LLL d, y")}
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-600">Check-out</h3>
                <p className="font-semibold text-title">
                  {format(search.checkOut, "EEE LLL d, y")}
                </p>
              </div>
            </div>
            <div className="py-2">
              <h3 className="text-gray-600">Total length of stay:</h3>
              <p className="font-semibold text-title">{hotel.name}</p>
            </div>
            <div className="pt-2">
              <h3 className="text-gray-600">Guests:</h3>
              <p className="font-semibold text-title">
                {search.adultCount}{" "}
                {search.adultCount === 1 ? "Adult" : "Adults"} &{" "}
                {search.childCount}{" "}
                {search.childCount === 1 ? "Child" : "Children"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-[65%] flex-col rounded-lg shadow-2xl border border-gray-200">
          <h1 className="p-4 font-bold text-3xl text-title">
            Confirm your details
          </h1>
          <form className="flex flex-col p-4">
            <div className="flex">
              <label className="flex flex-col flex-1">
                <h1 className="text-sm font-semibold text-title">First name</h1>
                <input type="text" readOnly placeholder="" />
              </label>
              <label className="flex flex-col flex-1">
                <h1 className="text-sm font-semibold text-title">Last name</h1>
                <input type="text" readOnly placeholder="" />
              </label>
            </div>
            <label className="flex flex-col flex-1">
              <h1 className="text-sm font-semibold text-title">Email</h1>
              <input type="text" readOnly placeholder="" />
            </label>
            <div>
              <h1>Your price summary</h1>
              <p className="flex flex-col text-lg text-title font-semibold">
                Total cost:
                <span className="text-xs text-gray-500 font-normal">
                  Includes taxes and charges
                </span>
              </p>
            </div>
            <div>
              <h1 className="text-lg text-title font-semibold">
                Payment details
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
