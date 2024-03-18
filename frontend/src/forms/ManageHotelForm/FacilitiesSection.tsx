import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelType } from "../../../../backend/src/shared/types";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelType>();
  return (
    <div className="flex flex-col gap-2 mt-4">
      <h3 className="font-semibold  mb-2"> Facilities</h3>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility, i) => (
          <label className="flex gap-2 items-center" key={i}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required.";
                  }
                },
              })}
            />
            <span className="font-normal text-sm">{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-xs text-[#F56C6C] ">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
