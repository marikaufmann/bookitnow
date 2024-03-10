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
		throw new Error(data.message)
	}
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
		throw new Error(data.message)
	}
	return data
}

export const signOut = async () => {
	const res = await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' })
	if (!res.ok) throw new Error("Error during sign out")

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