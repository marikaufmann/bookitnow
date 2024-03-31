import { useQuery } from "react-query";
import { HotelType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";

const LatestDestinations = () => {
  const { data: hotels } = useQuery<HotelType[]>(
    "fetchHotels",
    apiClient.fetchHotels
  );
  const sortedHotels = hotels?.sort(
    (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  const topRowHotels = sortedHotels?.slice(0, 2);
  const bottomRowHotels = sortedHotels?.slice(2, 14);
  return (
    <div className="my-10 ">
      <h1 className="text-title md:text-3xl text-xl font-bold mb-4">
        Latest Destinations
      </h1>
      <div className="flex gap-6 rounded-md mb-10">
        {topRowHotels?.map((hotel) => (
          <Link
            key={hotel._id}
            to={`/hotel/${hotel._id}`}
            className="flex-1 relative h-[300px] hover:shadow-2xl overflow-hidden"
          >
            <img
              src={hotel.imageUrls[0]}
              alt=""
              className="hover:scale-[104%] transition-all ease-out object-cover rounded-md object-center w-full h-full"
            />
            <div className="absolute  bottom-0 left-0 right-0  bg-black/40 rounded-b-md">
              <h3 className="text-bg font-semibold px-2 py-1">{hotel.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="gap-6 flex rounded-md flex-wrap">
        {bottomRowHotels?.map((hotel) => (
          <Link
            key={hotel._id}
            to={`/hotel/${hotel._id}`}
            className="h-[200px] min-w-[250px] relative flex-1 hover:shadow-2xl overflow-hidden"
          >
            <img
              src={hotel.imageUrls[0]}
              alt=""
              className="hover:scale-[104%] transition-all ease-out object-cover rounded-md object-center w-full h-full"
            />
            <div className="absolute  bottom-0 left-0 right-0  bg-black/40 rounded-b-md ">
              <h3 className="text-bg font-semibold px-2 py-1">{hotel.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestDestinations;
