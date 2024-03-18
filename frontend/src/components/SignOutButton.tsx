import * as apiClient from "../api-client";
import { useQueryClient, useMutation } from "react-query";
import { useAppContext } from "../hooks/use-app-context";

const SignOutButton = ({
  styles,
  closeNav,
}: {
  styles?: string;
  closeNav?: () => void;
}) => {
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
  const handleClick = () => {
    logout();
    if (closeNav) {
      closeNav();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`text-bg py-2 px-3 pl-4 text-normal tracking-wide rounded-md hover:bg-[#505c7f] ${styles ? styles : ''}`}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
