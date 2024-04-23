import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client.ts";
import {
  MapPin,
  Star,
  ParkingSquare,
  Wifi,
  Utensils,
  PawPrint,
  ConciergeBell,
  HeartHandshake,
  Dumbbell,
  CigaretteOff,
  PlaneTakeoff,
  Accessibility,
  Baby,
  Sparkles,
  BatteryCharging,
  Waves,
} from "lucide-react";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm.tsx";
import PageNotFound from "../components/PageNotFound.tsx";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    { enabled: !!hotelId }
  );

  if (!hotel && !isLoading) {
    return <PageNotFound />;
  }
  if (!hotel) {
    return "";
  }

  return (
    <div className="max-w-7xl w-full mx-auto flex-1 sm:px-4 px-1 sm:py-4 py-2 min-h-screen">
      <div className="flex flex-col">
        <div className=" grid grid-cols-3 grid-rows-3 gap-2">
          <div className="row-start-1 row-end-3 col-start-1 col-end-3 max-h-[300px] rounded-lg">
            <img
              src={hotel?.imageUrls[0]}
              alt=""
              className="object-cover object-center w-full h-full  rounded-lg"
            />
          </div>
          <div className="row-start-1 row-span-1 col-start-3 col-span-1 max-h-[150px] rounded-lg">
            <img
              src={hotel?.imageUrls[1]}
              alt=""
              className="object-cover object-center w-full h-full  rounded-lg"
            />
          </div>
          <div className="row-start-2 row-span-1 col-start-3 col-span-1 max-h-[150px] rounded-lg">
            <img
              src={hotel?.imageUrls[2]}
              alt=""
              className="object-cover object-center w-full h-full  rounded-lg"
            />
          </div>
          <div className="row-start-3 row-span-1 col-start-1 col-span-1 max-h-[150px] rounded-lg">
            <img
              src={hotel?.imageUrls[3]}
              alt=""
              className="object-cover object-center w-full h-full  rounded-lg"
            />
          </div>
          <div className="row-start-3 row-span-1 col-start-2 col-span-1 max-h-[150px] rounded-lg">
            <img
              src={hotel?.imageUrls[4]}
              alt=""
              className="object-cover object-center w-full h-full  rounded-lg"
            />
          </div>
          <div className="row-start-3 row-span-1 col-start-3 col-span-1 max-h-[150px] rounded-lg">
            <img
              src={hotel?.imageUrls[5]}
              alt=""
              className="object-cover object-center w-full h-full  rounded-lg"
            />
          </div>
        </div>
        <div className="w-full flex mt-6 mb-10 gap-8 max-md:flex-col">
          <div className="flex-[60%] flex flex-col gap-2">
            <h1 className="text-title font-bold text-3xl">{hotel?.name}</h1>
            <div className="flex items-center">
              {hotel ? (
                <>
                  {Array.from({ length: hotel!.starRating }).map((_, index) => (
                    <div key={index}>
                      <Star className="w-4 h-4 md:w-5 md:h-5  fill-yellow-400  text-yellow-400" />
                    </div>
                  ))}
                  <span className="text-sm text-gray-600">
                    &nbsp;{hotel!.starRating}
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4   text-red-400" />{" "}
              <span>&nbsp;{hotel?.city}</span>
              <span>, {hotel?.country}</span>
            </div>
            <div className="mt-3">
              <div>
                <h3 className="text-title font-semibold text-xl">Overview</h3>
                <p className="mt-2 leading-7 text-justify">
                  {hotel?.description}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-title font-semibold text-xl">Facilities</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  {hotel?.facilities.map((facility) => (
                    <div className="flex items-center" key={facility}>
                      {facility === "Parking" ? (
                        <ParkingSquare className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Free WiFi" ? (
                        <Wifi className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Restaurant" ? (
                        <Utensils className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Pets allowed" ? (
                        <PawPrint className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Room service" ? (
                        <ConciergeBell className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "24-hour front desk" ? (
                        <HeartHandshake className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Fitness centre" ? (
                        <Dumbbell className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Non-Smoking Rooms" ? (
                        <CigaretteOff className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Airport shuttle" ? (
                        <PlaneTakeoff className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Facilities for disabled guests" ? (
                        <Accessibility className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Family rooms" ? (
                        <Baby className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Spa and wellness centre" ? (
                        <Sparkles className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Electric vehicle charging station" ? (
                        <BatteryCharging className="w-4 h-4 text-primary mr-1" />
                      ) : facility === "Swimming pool" ? (
                        <Waves className="w-4 h-4 text-primary mr-1" />
                      ) : (
                        ""
                      )}
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[40%]">
            <GuestInfoForm hotel={hotel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
