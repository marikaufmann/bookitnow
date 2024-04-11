import { useForm } from "react-hook-form";
import { useSearchContext } from "../../hooks/use-search-context";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import { useAppContext } from "../../hooks/use-app-context";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelType } from "../../../../backend/src/shared/types";
export type GuestFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  rooms: number;
};
const GuestInfoForm = ({ hotel }: { hotel: HotelType }) => {
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const search = useSearchContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GuestFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
      rooms: search.rooms,
    },
  });
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const rooms = watch("rooms");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const handleBookNow = (data: GuestFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      data.rooms
    );
    navigate(`/hotel/${hotel._id}/booking`);
  };
  const handleSignInAndBook = (data: GuestFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      data.rooms
    );
    navigate("/sign-in", { state: { from: location } });
  };
  useEffect(() => {
    if (checkOut.getTime() === checkIn.getTime()) {
      setNumberOfNights(1);
      setTotalPrice(hotel.pricePerNight * numberOfNights * rooms);
    } else {
      const totalNights =
        Math.abs(checkOut.getTime() - checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(totalNights));
      setTotalPrice(hotel.pricePerNight * numberOfNights * rooms);
    }
  }, [
    checkIn,
    checkOut,
    numberOfNights,
    totalPrice,
    hotel.pricePerNight,
    rooms,
  ]);

  return (
    <div className="bg-gray-100 shadow-2xl rounded-lg p-4 w-full">
      <form action="" className="flex flex-col gap-2">
        <label className="bg-bg p-2 rounded-md w-full">
          <CalendarDays className="absolute text-gray-600 w-5 h-5" />
          <DatePicker
            portalId="root-portal"
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check in date"
            className="  focus:outline-none ml-7 text-title"
            wrapperClassName="min-w-full"
          />
        </label>
        <label className="bg-bg p-2 rounded-md w-full">
          <CalendarDays className="absolute text-gray-600 w-5 h-5" />
          <DatePicker
            portalId="root-portal"
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check out date"
            className=" 
               focus:outline-none ml-7 text-title"
            wrapperClassName="min-w-full"
          />
        </label>
        <label className="flex p-2 rounded-md w-full bg-bg text-gray-600 ">
          Adults:
          <input
            className="focus:outline-none ml-1 text-title w-full"
            type="number"
            min={1}
            max={20}
            {...register("adultCount", {
              required: "This fieid is required",
              min: { value: 1, message: "There must be at least one adult" },
              max: {
                value: hotel.adultCount,
                message: `Booking for more than ${hotel.adultCount} ${
                  hotel.adultCount === 1 ? "adult" : "adults"
                } is not possible for the selected dates.`,
              },
              valueAsNumber: true,
            })}
          />
        </label>
        {errors.adultCount && (
          <span className="text-xs text-[#F56C6C]">
            {errors.adultCount.message}
          </span>
        )}
        <label className="flex p-2 rounded-md w-full bg-bg text-gray-600">
          Children:
          <input
            type="number"
            min={0}
            max={20}
            {...register("childCount", {
              valueAsNumber: true,
              max: {
                value: hotel.childCount,
                message: `Booking for more than ${hotel.childCount} ${
                  hotel.childCount === 1 ? "child" : "children"
                } is not possible for the selected dates.`,
              },
            })}
            className="focus:outline-none ml-1 text-title w-full"
          />
        </label>
        {errors.childCount && (
          <span className="text-xs text-[#F56C6C]">
            {errors.childCount.message}
          </span>
        )}
        <label className="flex p-2 rounded-md w-full bg-bg text-gray-600">
          Rooms:
          <input
            type="number"
            min={1}
            max={20}
            {...register("rooms", {
              required: "This fieid is required",
              min: {
                value: 1,
                message: "At least one room booking is required",
              },
              max: {
                value: hotel.rooms,
                message: `Booking more than ${hotel.rooms} ${
                  hotel.rooms === 1 ? "room" : "rooms"
                } is not possible for the selected dates.`,
              },
              valueAsNumber: true,
            })}
            className="focus:outline-none ml-1 text-title w-full"
          />
        </label>
        {errors.rooms && (
          <span className="text-xs text-[#F56C6C]">{errors.rooms.message}</span>
        )}
        <div className="shadow-2xl px-2 py-4 bg-bg divide-y divide-gray-100 rounded-md mt-4">
          <h1 className="font-semibold text-title pb-2">Price</h1>
          <div className="pt-2">
            <dl className="flex justify-between">
              <dt className="text-title text-sm">room / night</dt>
              <dd className="text-sm text-title">€ {hotel.pricePerNight}</dd>
            </dl>
            <h3 className="font-bold text-title mt-6">Total:</h3>
            <dl className="flex justify-between ">
              <dt>
                {rooms} {rooms === 1 ? "Room" : "Rooms"} / {numberOfNights}{" "}
                {numberOfNights === 1 ? "night" : "nights"}
              </dt>

              <dd>€ {totalPrice}</dd>
            </dl>
          </div>
        </div>
        <button
          onClick={
            isLoggedIn
              ? handleSubmit(handleBookNow)
              : handleSubmit(handleSignInAndBook)
          }
          className="mt-2 w-full bg-primary rounded-lg font-semibold text-bg hover:bg-primary/80 py-2"
        >
          {isLoggedIn ? "Book now" : "Sign in to book"}
        </button>
      </form>
    </div>
  );
};

export default GuestInfoForm;
