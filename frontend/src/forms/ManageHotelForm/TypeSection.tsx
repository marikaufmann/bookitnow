import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelType } from "../../../../backend/src/shared/types";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelType>();
  const typeWatch = watch("type");
  return (
    <div className="flex flex-col gap-2 mt-4">
      <h3 className="font-semibold text-sm mb-2"> Type</h3>
      <div className="grid grid-cols-5 gap-3">
        {hotelTypes.map((type, i) => (
          <label
					key={i}
            className={
              typeWatch === type
                ? "bg-gray-500 rounded-full flex justify-center items-center px-3 py-1 text-sm  cursor-pointer text-bg shadow-md"
                : "bg-gray-100 rounded-full flex justify-center items-center px-3 py-1 text-sm hover:bg-gray-200 cursor-pointer"
            }>
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type", { required: "Type is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-xs text-[#F56C6C] ">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
