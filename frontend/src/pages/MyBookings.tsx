import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import { Link } from "react-router-dom";
import Booking from "../components/Booking.tsx";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );
  // const sortedHotels = hotels?.sort(
  //   (a, b) =>
  //     new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  // );
  if (!hotels || hotels.length === 0) {
    return (
      <div className="max-w-7xl w-full mx-auto flex-1 px-8">
        <div className="pt-40 h-screen items-center flex flex-col gap-4">
          <h3 className="text-4xl">No bookings yet...</h3>
          <Link
            to="/search"
            className="bg-primary text-bg px-6 py-2 shadow font-semibold rounded-md hover:bg-primary/80"
          >
            Book your dream stay now!
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen h-full max-w-7xl w-full mx-auto flex flex-col px-8 gap-8 py-10">
      <h1 className="md:text-4xl text-3xl font-semibold">My Bookings</h1>
      <div className="flex flex-col gap-6">
        {hotels?.map((hotel) => (
          <Booking hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
