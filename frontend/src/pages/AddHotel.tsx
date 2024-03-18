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
      showToast({ message: 'Error saving hotel.', type: "ERROR" });
    },
    onSuccess: () => {
      showToast({ message: "Hotel added successfully!", type: "SUCCESS" });
      navigate("/my-hotels");
    },
  });
  const onSave = (formData: FormData) => {
    addHotel(formData);
  };
  return <ManageHotelForm onSave={onSave} isLoading={isLoading} />;
};

export default AddHotel;
