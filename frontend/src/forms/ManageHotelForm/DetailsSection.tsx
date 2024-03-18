import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-2  w-full">
      <label htmlFor="name" className="flex flex-col font-semibold  gap-1 ">
        Name
        <input
          {...register("name", { required: "Name is required." })}
          type="text"
          id="name"
          className="border border-gray-200 rounded p-2 font-normal"
        />
        {errors.name && (
          <span className="text-xs text-[#F56C6C] ">{errors.name.message}</span>
        )}
      </label>
      <div>
        <label htmlFor="city" className="flex flex-col font-semibold  gap-1">
          City
          <input
            {...register("city", { required: "City is required." })}
            type="text"
            id="city"
            className="border border-gray-200 rounded p-2 font-normal"
          />
          {errors.city && (
            <span className="text-xs text-[#F56C6C] ">
              {errors.city.message}
            </span>
          )}
        </label>
        <label htmlFor="country" className="flex flex-col font-semibold  gap-1">
          Country
          <input
            {...register("country", { required: "Country is required." })}
            type="text"
            id="country"
            className="border border-gray-200 rounded p-2 font-normal"
          />
          {errors.country && (
            <span className="text-xs text-[#F56C6C] ">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="flex flex-col font-semibold  gap-1" htmlFor="description">
        Description
        <textarea
          {...register("description", { required: "Description is required." })}
          className="resize-none border border-gray-200 font-normal rounded  p-2"
          name="description"
          id="description"
          rows={5}
        />
        {errors.description && (
          <span className="text-xs text-[#F56C6C] ">
            {errors.description.message}
          </span>
        )}
      </label>
      <label
        htmlFor="pricePerNight"
        className="flex flex-col font-semibold  gap-1"
      >
        Price per night
        <input
          {...register("pricePerNight", {
            required: "Price per night is required.",
          })}
          min={1}
          type="number"
          id="pricePerNight"
          className="border border-gray-200 rounded  p-2 font-normal"
        />
        {errors.pricePerNight && (
          <span className="text-xs text-[#F56C6C] ">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label
        {...register("starRating", { required: "Star rating is required." })}
        htmlFor="starRating"
        className="flex flex-col font-semibold  gap-2"
      >
        Star rating
        <select
          name="starRating"
          id="starRating"
          className="font-normal border border-gray-200 rounded p-2"
        >
          <option value="">Select as rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-xs text-[#F56C6C] ">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
