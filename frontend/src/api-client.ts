import { HotelType } from "../../backend/src/shared/types"
import { RegisterFormData, SignInFormData } from "./types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

export const register = async (formData: RegisterFormData) => {
	const res = await fetch(`${API_BASE_URL}/api/users/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error('Failed to register.')
	}
	return data
}

export const signIn = async (formData: SignInFormData) => {
	const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: 'POST', credentials: 'include', headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})
	const data = await res.json()
	if (!res.ok) {
		throw new Error('Failed to sign in.')
	}
	return data
}

export const signOut = async () => {
	const res = await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' })
	if (!res.ok) throw new Error("Error during sign out.")

}
export const validateToken = async () => {
	const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
		credentials: 'include',
	})
	if (!res.ok) {
		throw new Error('Token invalid.')
	}
	return res.json()
}

export const addMyHotel = async (formData: FormData) => {
	const res = await fetch(`${API_BASE_URL}/api/my-hotels/add-hotel`, {

		method: 'POST',
		body: formData,
		credentials: "include",
	})
	if (!res.ok) {
		throw new Error('Failed to add hotel.')
	}
	return res.json()
}
export const fetchMyHotelById = async (hotelId: string) => {
	const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
		credentials: 'include'
	})
	if (!res.ok) {
		throw new Error('Failed to fetch hotel.')
	}
	return res.json()

}
export const deleteMyHotel = async (hotelId: string) => {
	const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
		credentials: 'include',
		method: 'DELETE'
	})
	if (!res.ok) {
		throw new Error('Failed to delete hotel.')
	}
	return res.json()

}
export const updateMyHotel = async (formData: FormData) => {
	const res = await fetch(`${API_BASE_URL}/api/my-hotels/${formData.get('hotelId')}`, {
		method: 'PUT',
		body: formData,
		credentials: "include",
	})
	if (!res.ok) {
		throw new Error('Failed to update hotel.')
	}
	return res.json()
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
	const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
		credentials: 'include'
	})
	if (!res.ok) {
		throw new Error('Failed to fetch hotels.')
	}
	return res.json()

}