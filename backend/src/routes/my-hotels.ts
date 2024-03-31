import express, { Request, Response } from 'express'
import { verifyToken } from '../middleware/verifyToken'
import multer from 'multer'
import { check } from 'express-validator'
import { HotelType } from '../shared/types'
import cloudinary from 'cloudinary'
import Hotel from '../models/hotel'
const storage = multer.memoryStorage()
const upload = multer({
	storage,
	limits: {
		fileSize: 10 * 1024 * 1024
	}
})
const router = express.Router()

router.post('/add-hotel',
	verifyToken,
	[check('name', 'Name is required').notEmpty(),
	check('city', 'City is required').notEmpty(),
	check('country', 'Country is required').notEmpty(),
	check('description', 'Description is required').notEmpty(),
	check('type', 'Type is required').notEmpty(),
	check('pricePerNight', 'Price per night is required').notEmpty().isNumeric(),
	check('adultCount', 'Adult count is required').notEmpty().isNumeric(),
	check('starRating', 'Star rating is required').notEmpty().isNumeric(),
	check('facilities', 'Facilities is required').notEmpty().isArray(),
	],
	upload.array('imageFiles', 6),
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[]
			const newHotel: HotelType = req.body
			const imageUrls = await uploadImages(imageFiles)
			newHotel.userId = req.userId
			newHotel.lastUpdated = new Date()
			newHotel.imageUrls = imageUrls
			const hotel = new Hotel(newHotel)
			await hotel.save()
			return res.status(201).send(hotel)
		} catch (err) {
			return res.status(500).json({ message: 'Something went wrong.' })

		}
	})

router.get("/", verifyToken, async (req: Request, res: Response) => {
	try {
		const hotels = await Hotel.find({ userId: req.userId });
		res.json(hotels);
	} catch (error) {
		res.status(500).json({ message: "Error fetching hotels" });
	}
});
router.get('/:hotelId', verifyToken, async (req: Request, res: Response) => {
	try {
		const hotel = await Hotel.findOne({ userId: req.userId, _id: req.params.hotelId })
		res.status(200).send(hotel)
	} catch (err) {
		res.status(500).json({ message: 'Error fetching hotel.' })
	}
})
router.delete('/:hotelId', verifyToken, async (req: Request, res: Response) => {
	try {
		const hotel = await Hotel.findOne({ userId: req.userId, _id: req.params.hotelId })
		if (!hotel) return res.status(404).json({ message: 'Hotel not found.' })
		const result = await hotel.deleteOne()
		res.status(200).json({ message: `Hotel ${hotel.name} deleted successfully.` })
	} catch (err) {
		res.status(500).json({ message: 'Error fetching hotel.' })
	}
})

router.put('/:hotelId', verifyToken,
	[check('name', 'Name is required').notEmpty(),
	check('city', 'City is required').notEmpty(),
	check('country', 'Country is required').notEmpty(),
	check('description', 'Description is required').notEmpty(),
	check('type', 'Type is required').notEmpty(),
	check('pricePerNight', 'Price per night is required').notEmpty().isNumeric(),
	check('adultCount', 'Adult count is required').notEmpty().isNumeric(),
	check('starRating', 'Star rating is required').notEmpty().isNumeric(),
	check('facilities', 'Facilities is required').notEmpty().isArray(),
	],
	upload.array('imageFiles', 6),
	async (req: Request, res: Response) => {
		try {
			const updatedHotel: HotelType = req.body
			updatedHotel.lastUpdated = new Date()

			const hotel = await Hotel.findByIdAndUpdate(
				{
					_id: req.params.hotelId,
					userId: req.userId
				},
				updatedHotel,
				{ new: true })
			if (!hotel) return res.status(404).json({ message: 'Hotel not found.' })
			const imageFiles = req.files as Express.Multer.File[]
			const updatedImageUrls = await uploadImages(imageFiles)
			hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || []),]
			await hotel.save()
			return res.status(201).send(hotel)
		} catch (err) {
			return res.status(500).json({ message: 'Something went wrong.' })
		}
	})


const uploadImages = async (imageFiles: Express.Multer.File[]) => {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString('base64')
		let dataURI = 'data:' + image.mimetype + ';base64,' + b64
		const res = await cloudinary.v2.uploader.upload(dataURI)
		return res.url
	})
	const imageUrls = await Promise.all(uploadPromises)
	return imageUrls
}
export default router