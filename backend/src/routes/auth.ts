import express, { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middleware/verifyToken'
const router = express.Router()

router.post('/login', [check('email', 'Email is required.').isEmail(), check('password', 'Password with 6 or more characters required.').isLength({ min: 6 })], async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() })
	try {
		const { email, password } = req.body
		let user = await User.findOne({ email })
		if (!user) return res.status(400).json({ message: 'Invalid credentials' })
		const isMatch = bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
		const token = jwt.sign({
			userId: user.id
		},
			process.env.JWT_SECRET_KEY as string,
			{
				expiresIn: '1d'
			})
		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 86400000
		})
		res.status(200).json({ userId: user.id })

	} catch (err) {
		res.status(500).json({ message: 'Something went wrong.' })

	}
})

router.post('/logout', async (req: Request, res: Response) => {
	res.cookie('auth_token', '', {
		expires: new Date(0)
	})
	res.send()
})

router.get('/validate-token', verifyToken, async (req: Request, res: Response) => {
	res.status(200).send({ userId: req.userId })
})

export default router;