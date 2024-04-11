export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type HotelType = {
  _id: string;
  userId: string;
  country: string;
  city: string;
  name: string;
  type: string;
  description: string;
  facilities: string[];
  adultCount: number;
  childCount: number;
  rooms: number;
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};
export type HotelSearchResponseType = {
  data: HotelType[],
  pagination: {
    total: number,
    page: number,
    pages: number
  }
};
export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  rooms: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type ArticleType = {
  _id: string;
  title: string;
  text: string;
  names: string[];
  imageUrls: string[];
  captions: string[];
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
