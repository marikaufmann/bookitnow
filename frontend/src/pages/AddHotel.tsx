import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client.ts";
import { useAppContext } from "../hooks/use-app-context";
import { useNavigate } from "react-router-dom";
const AddHotel = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate: addHotel, isLoading } = useMutation(apiClient.addMyHotel, {
    onError: () => {
      showToast({ message: "Error saving hotel.", type: "ERROR" });
    },
    onSuccess: () => {
      showToast({ message: "Hotel added successfully!", type: "SUCCESS" });
      navigate("/my-hotels");
    },
  });
  const onSave = (formData: FormData) => {
    addHotel(formData);
  };
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 sm:px-4 px-1">
      <ManageHotelForm onSave={onSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
