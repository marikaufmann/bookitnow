export type RegisterFormData = {
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	confirmPassword: string
}

export type SignInFormData = {
	email: string,
	password: string,
}

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
};