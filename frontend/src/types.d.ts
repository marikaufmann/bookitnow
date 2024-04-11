export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  rooms: number;
};
export type HotelArticleType = {
  _id: string;
  name: string;
  imageUrl: string;
  caption: string;
  text: string;
};
export type ArticleType = {
  _id: string;
  title: string;
  imageUrl: string;
  text: string;
  hotels: HotelArticleType[];
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  rooms: number;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};
