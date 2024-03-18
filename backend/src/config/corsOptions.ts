import { allowedOrigins } from "./allowedOrigins"
export const corsOptions = {
	origin: (origin: string, callback: Function) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
	optionSuccessStatus: 200
}