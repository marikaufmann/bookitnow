export type UserType = {
	_id: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
}

export type HotelType = {
	_id: string,
	userId: string,
	country: string,
	city: string,
	name: string,
	type: string,
	description: string,
	facilities: string[],
	adultCount: number,
	childCount: number,
	pricePerNight: number,
	starRating: number,
	imageUrls: string[],
	lastUpdated: Date,
	bookings: BookingType[]
}

export type BookingType = {
	_id: string,
	firstName: string,
	lastName: string,
	email: string,
	adultCount: number,
	childCount: number,
	checkIn: Date,
	checkOut: Date,
	totalCost: number
}