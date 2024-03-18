import { useForm, FormProvider } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import { HotelFormData } from "../../types";

type ManageHotelFormProps = {
  onSave: (hotelData: FormData) => void;
  onDelete?: (hotelId: string) => void;
  isLoading: boolean;
  isDeleting?: boolean;
  hotel?: HotelType;
};
const ManageHotelForm = ({
  onSave,
  onDelete,
  isLoading,
  isDeleting,
  hotel,
}: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { reset, handleSubmit } = formMethods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);
  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });
  const deleteHotel = () => {
    if (onDelete) {
      onDelete(hotel!._id);
    }
  };
  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-2 py-10 max-w-3xl mx-auto h-full"
        onSubmit={onSubmit}
      >
        <div className="">
          {hotel ? (
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-3xl py-4">Edit Hotel</h1>
              <button
                onClick={deleteHotel}
                disabled={isDeleting}
                className="px-8 py-2 rounded bg-red-600 text-bg font-semibold hover:bg-red-600/80"
              >
                Delete
              </button>
            </div>
          ) : (
            <h1 className="font-semibold text-3xl py-4">Add Hotel</h1>
          )}
        </div>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <button
          disabled={isLoading}
          className="self-end mt-10 px-8 py-2 rounded bg-primary text-bg font-semibold hover:bg-primary/80"
        >
          Save
        </button>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
