import { useQuery } from "react-query";
import { createContext, useState } from "react";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";
export type ShowToastPayload = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
export type AppContext = {
  showToast: (payload: ShowToastPayload) => void;
  isLoggedIn: boolean;
};

export const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ShowToastPayload | undefined>(undefined);
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (payload) => setToast(payload),
        isLoggedIn: !isError,
      }}>
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

