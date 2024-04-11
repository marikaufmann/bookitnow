import { useQuery } from "react-query";
import { createContext, useState } from "react";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

export type ShowToastPayload = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
export type AppContext = {
  showToast: (payload: ShowToastPayload) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

export const AppContext = createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(STRIPE_PUB_KEY);
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
        stripePromise,
      }}
    >
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
