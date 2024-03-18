import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types";

import { X } from "lucide-react";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string,
  ) => {
    e.preventDefault();
    const newImageUrls = existingImageUrls.filter((url) => url !== imageUrl);
    setValue("imageUrls", newImageUrls);
  };
  return (
    <div>
      <label htmlFor="imageFiles" className="flex flex-col gap-2 font-semibold">
        Images
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img
                  src={url}
                  alt="hotelImage"
                  className="min-h-full object-cover"
                />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 justify-center items-center flex bg-black opacity-30  text-bg group-hover:opacity-60">
                  <X className="w-5 h-5  " />
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalFiles =
							imageFiles?.length + (existingImageUrls?.length || 0) 
              if (totalFiles === 0) {
                return "At least one image should be added.";
              } else if (totalFiles > 6) {
                return "total number of images cannot be more than 6.";
              }
              return true;
            },
          })}
          className="font-normal text-sm bg-gray-100 p-3 rounded"
          type="file"
          multiple
          accept="image/*"
          id="imageFiles"
        />
        {errors.imageFiles && (
          <span className="text-xs text-[#F56C6C] ">
            {errors.imageFiles.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default ImagesSection;
