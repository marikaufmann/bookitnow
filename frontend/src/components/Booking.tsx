import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { HotelType } from "../../../backend/src/shared/types";

const Booking = ({ hotel }: { hotel: HotelType }) => {
  return (
    <div
      key={hotel._id}
      className="flex  bg-gray-100 rounded-lg overflow-hidden"
    >
      <div className="flex-[30%]">
        <img
          src={hotel.imageUrls[0]}
          alt=""
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div className="flex-[70%] flex flex-col p-2 gap-1">
        <h1 className="font-semibold mb-1 text-lg">{hotel.name}</h1>
        <div className=" items-center flex-1 flex">
          <h3 className="text-gray-600">Location: &nbsp;</h3>
          <div className="flex items-center font-semibold text-title">
            <MapPin className="w-4 h-4   text-red-400" /> {hotel.city}
            &nbsp;•&nbsp;
            {hotel.country}
          </div>
        </div>
        <div className="">
          <h1 className=" text-gray-600 mt-2 mb-1">
            All your bookings for this {hotel.type.toLowerCase().slice(0, -1)}:
          </h1>
          <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto">
            {hotel.bookings.map((booking) => (
              <div className="bg-gray-200 flex flex-col p-2 rounded">
                <div className="flex flex-col">
                  <div className="flex-1 flex">
                    <h3 className="text-gray-600">Check-in: </h3>
                    &nbsp;
                    <p className="font-semibold text-title">
                      {format(booking.checkIn, "EEEE, LLLL do y")}
                    </p>
                  </div>
                  <div className="flex-1 flex">
                    <h3 className="text-gray-600">Check-out: </h3>
                    &nbsp;
                    <p className="font-semibold text-title">
                      {format(booking.checkOut, "EEEE, LLLL do y")}
                    </p>
                  </div>
                </div>
                <div className=" flex gap-2">
                  <h3 className="text-gray-600">Guests:</h3>
                  <p className="font-semibold text-title">
                    {booking.adultCount}{" "}
                    {booking.adultCount === 1 ? "Adult" : "Adults"} &{" "}
                    {booking.childCount}{" "}
                    {booking.childCount === 1 ? "Child" : "Children"}
                  </p>
                </div>
                <div className=" flex gap-2 ">
                  <h3 className="text-gray-600">Rooms:</h3>
                  <p className="font-semibold text-title">{booking.rooms}</p>
                </div>
                <div className=" flex gap-2">
                  <h3 className="text-gray-600">Total amount:</h3>
                  <p className="font-semibold text-title">
                    €{booking.totalCost}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
