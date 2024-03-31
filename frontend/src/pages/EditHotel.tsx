import { useMutation, useQuery } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client.ts";
import { useAppContext } from "../hooks/use-app-context";
import { useNavigate, useParams } from "react-router-dom";
const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    },
  );
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate: updateHotel, isLoading } = useMutation(
    apiClient.updateMyHotel,
    {
      onError: (err: Error) => {
        showToast({ message: err.message, type: "ERROR" });
      },
      onSuccess: () => {
        showToast({ message: "Hotel edited successfully!", type: "SUCCESS" });
        navigate("/my-hotels");
      },
    },
  );
  const onSave = (formData: FormData) => {
    updateHotel(formData);
  };
  const { mutate: deleteHotel, isLoading: isDeleting } = useMutation(
    apiClient.deleteMyHotel,
    {
      onError: (err: Error) => {
        showToast({ message: err.message, type: "ERROR" });
      },
      onSuccess: () => {
        showToast({ message: "Hotel deleted.", type: "SUCCESS" });
        navigate("/my-hotels");
      },
    },
  );
  const onDelete = (hotelId: string) => {
    deleteHotel(hotelId);
  };
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 px-8">

      <ManageHotelForm
        onSave={onSave}
        onDelete={onDelete}
        isLoading={isLoading}
        isDeleting={isDeleting}
        hotel={hotel}
      />
    </div>
  );
};

export default EditHotel;
