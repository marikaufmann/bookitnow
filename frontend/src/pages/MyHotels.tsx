import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
const MyHotels = () => {
  const { data: hotels } = useQuery("fetchMyHotels", apiClient.fetchMyHotels);
  if (!hotels || hotels.length < 1)
    return (
      <div className="max-w-7xl w-full mx-auto flex-1 sm:px-4 px-1">
        <div className="pt-40 h-screen items-center flex flex-col gap-4">
          <h3 className="text-4xl ">No hotels here...</h3>
          <Link
            to="/add-hotel"
            className="bg-primary text-bg px-6 py-2 shadow font-semibold rounded-md hover:bg-primary/80"
          >
            Add hotel
          </Link>
        </div>
      </div>
    );
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 sm:px-4 px-1">
      <div className="flex flex-col gap-8 py-10 h-full">
        <div className="flex justify-between">
          <h1 className="md:text-4xl text-3xl font-semibold">My Hotels</h1>
          <Link
            to="/add-hotel"
            className="bg-primary text-bg px-6 py-2 shadow font-semibold rounded-md hover:bg-primary/80"
          >
            Add hotel
          </Link>
        </div>
        {hotels.map((hotel: HotelType, index: number) => (
          <Link to={`/edit-hotel/${hotel._id}`} key={index}>
            <div className="p-4  bg-gray-100 rounded-lg flex flex-col gap-1 hover:bg-gray-200 hover:shadow">
              <h1 className="font-semibold text-lg">{hotel.name}</h1>
              <p>
                {hotel.city}, {hotel.country}
              </p>
              <p className="truncate text-sm text-gray-600">
                {hotel.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
