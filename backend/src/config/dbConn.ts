import mongoose from 'mongoose'
export const connectDb = () => {
	try {
		mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

	} catch (err) {
		console.log(err);

	}
}