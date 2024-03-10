import * as apiClient from "../api-client";
import { useQueryClient, useMutation } from "react-query";
import { useAppContext } from "../hooks/use-app-context";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { mutate: logout } = useMutation(apiClient.signOut, {
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
    },
  });
  return (
    <button
      onClick={() => logout()}
      className="bg-bg text-primary px-3 py-2 rounded-md hover:bg-mutedbgblue">
      Sign Out
    </button>
  );
};

export default SignOutButton;
