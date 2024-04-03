import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className=" font-semibold mt-2 mb-2">Guests</h1>
      <div className="flex flex-col gap-8 bg-gray-100 p-4">
        <div className="flex gap-8 bg-gray-100  rounded">
          <label
            htmlFor="adultCount"
            className="flex flex-col  text-sm gap-1 flex-1"
          >
            Adults
            <input
              {...register("adultCount", {
                required: "Adult count is required.",
              })}
              type="text"
              id="adultCount"
              className="border border-gray-200 rounded p-2 font-normal"
            />
            {errors.adultCount && (
              <span className="text-xs text-[#F56C6C] ">
                {errors.adultCount.message}
              </span>
            )}
          </label>
          <label
            htmlFor="childCount"
            className="flex flex-col  text-sm gap-1 flex-1"
          >
            Children
            <input
              {...register("childCount", {
                required: "Children count is required.",
              })}
              type="text"
              id="childCount"
              className="border border-gray-200 rounded p-2 font-normal"
            />
            {errors.childCount && (
              <span className="text-xs text-[#F56C6C] ">
                {errors.childCount.message}
              </span>
            )}
          </label>
        </div>
        <label
          htmlFor="rooms"
          className="flex flex-col  text-sm gap-1"
        >
          Rooms
          <input
            {...register("rooms", {
              required: "At least one room is required.",
            })}
            type="text"
            id="rooms"
            className="border border-gray-200 rounded p-2 font-normal"
          />
          {errors.rooms && (
            <span className="text-xs text-[#F56C6C] ">
              {errors.rooms.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
