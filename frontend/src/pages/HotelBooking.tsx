import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../hooks/use-search-context.tsx";
import { format } from "date-fns";
import PageNotFound from "../components/PageNotFound.tsx";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import BookingForm from "../forms/BookingForm/BookingForm.tsx";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../hooks/use-app-context.tsx";
const HotelBooking = () => {
  const { hotelId } = useParams();
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    { enabled: !!hotelId }
  );
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  const [totalNights, setTotalNights] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      if (search.checkIn.getTime() === search.checkOut.getTime()) {
        setTotalNights(1);
        return;
      }
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 24 * 60 * 60);
      setTotalNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);
  const { data: paymentIntent } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        search.rooms,
        Number(totalNights)
      ),
    { enabled: !!totalNights }
  );
  if (!hotel && !isLoading) {
    return <PageNotFound />;
  }
  if (!hotel) {
    return "";
  }

  return (
    <div className="max-w-7xl w-full mx-auto flex-1 sm:px-6 px-4 sm:py-4 py-2 min-h-screen ">
      <div className="flex gap-6 max-md:flex-col">
        <div className="flex-[35%] flex-col rounded-lg shadow-2xl border border-gray-200">
          <h1 className="p-4 font-bold text-xl text-title">Your booking</h1>
          <div className="p-4 -mt-4  flex flex-col divide-y divide-gray-200">
            <div className="flex flex-col">
              <div className="bg-red-400 h-[180px] rounded-md">
                <img
                  src={hotel.imageUrls[0]}
                  alt=""
                  className="object-cover rounded-md object-center h-full w-full"
                />
              </div>
              <h3 className="text-gray-600 mt-4">Destination:</h3>
              <div className="font-semibold text-title pb-2">
                <p>{hotel.name}</p>
                <p className="flex items-center mt-1">
                  <MapPin className="w-4 h-4 text-red-400 mr-1" />
                  {hotel.city}, {hotel.country}
                </p>
              </div>
            </div>
            <div className="flex flex-col py-2">
              <div className="flex-1 flex">
                <h3 className="text-gray-600">Check-in: </h3>
                &nbsp;
                <p className="font-semibold text-title">
                  {format(search.checkIn, "EEEE, LLLL do y")}
                </p>
              </div>
              <div className="flex-1 flex mt-2">
                <h3 className="text-gray-600">Check-out: </h3>
                &nbsp;
                <p className="font-semibold text-title">
                  {format(search.checkOut, "EEEE, LLLL do y")}
                </p>
              </div>
            </div>
            <div className="py-2">
              <h3 className="text-gray-600">Total length of stay:</h3>
              <p className="font-semibold text-title">{totalNights} nights</p>
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
            <div className="pt-2 flex gap-2">
              <h3 className="text-gray-600">Rooms:</h3>
              <p className="font-semibold text-title">{search.rooms}</p>
            </div>
          </div>
        </div>
        <div className="flex-[65%] flex-col rounded-lg shadow-2xl border border-gray-200">
          <h1 className="p-4 pb-0 font-bold text-3xl text-title">
            Confirm your details
          </h1>
          {currentUser && paymentIntent && (
            <Elements
              key={paymentIntent.clientSecret}
              stripe={stripePromise}
              options={{ clientSecret: paymentIntent.clientSecret }}
            >
              <BookingForm
                currentUser={currentUser}
                paymentIntent={paymentIntent}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
