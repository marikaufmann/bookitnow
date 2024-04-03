import { HotelType } from "../../backend/src/shared/types";
import { RegisterFormData, SignInFormData } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to register.");
  }
  return data;
};

export const signIn = async (formData: SignInFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to sign in.");
  }
  return data;
};

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error during sign out.");
};
export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Token invalid.");
  }
  return res.json();
};

export const addMyHotel = async (formData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/add-hotel`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to add hotel.");
  }
  return res.json();
};
export const fetchMyHotelById = async (hotelId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hotel.");
  }
  return res.json();
};
export const deleteMyHotel = async (hotelId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete hotel.");
  }
  return res.json();
};
export const updateMyHotel = async (formData: FormData) => {
  const res = await fetch(
    `${API_BASE_URL}/api/my-hotels/${formData.get("hotelId")}`,
    {
      method: "PUT",
      body: formData,
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to update hotel.");
  }
  return res.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hotels.");
  }
  return res.json();
};

type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  rooms?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  minPrice?: string;
  maxPrice?: string;
  sortOption?: string;
};
export const searchHotels = async (searchParams: SearchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("rooms", searchParams.rooms || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("minPrice", searchParams.minPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchDestinations = async (search: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", search || "");
  const res = await fetch(
    `${API_BASE_URL}/api/hotels/destination?${queryParams}`
  );
  if (!res.ok) {
    throw new Error("Error fetching destinations");
  }
  return res.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};
export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!res.ok) {
    throw new Error("Error fetching Hotels");
  }

  return res.json();
};

export const fetchUserLocation = async () => {
  const res = await fetch(
    `https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Error fetching user location.");
  }
  const data = await res.json();
  return data;
};

export const fetchArticles = async () => {
  const res = await fetch(`${API_BASE_URL}/api/articles`);
  if (!res.ok) {
    throw new Error("Error fetching articles");
  }
  return res.json();
};
export const fetchArticleById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/articles/${id}`);
  if (!res.ok) {
    throw new Error("Error fetching articles");
  }
  return res.json();
};
