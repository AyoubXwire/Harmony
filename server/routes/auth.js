const express = require('express')
const router = express.Router()
const prisma = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { verifyAuth } = require('../middleware/auth')

router.post('/login', async function (req, res) {
	try {
		const email = req.body.email
		const password = req.body.password
		
		if (!email || !password) return res.status(400).send({ message: 'Make sure you provide both your email and password' })
		if (!validator.isEmail(email)) return res.status(400).send({ message: 'That email does not seem to be correct' })

		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if (!user) return res.status(400).send({ message: 'That email does not exist in our records' })

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) return res.status(400).send({ message: 'The credentials provided do not match' })

		const accessToken = jwt.sign(email, process.env.SECRET)

		res.json({ accessToken: accessToken })
	} catch (error) {
		next(error)
	}
})

router.get('/userbytoken', verifyAuth, async function (req, res) {
	try {
		res.json({ user: req.user })
	} catch (error) {
		next(error)
	}
})

router.put('/update-password', verifyAuth, async function (req, res, next) {
	try {
		if (!req.body.oldPassword || !req.body.password || req.body.password2) return res.status(400).send({ message: 'Make sure you provide all the fields' })

		const isOldPasswordValid = await bcrypt.compare(req.body.oldPassword, req.user.password)
		const isPasswordConfirmed = req.body.password === req.body.password2

		if (!isOldPasswordValid) return res.status(400).send({ message: 'Your old password is not correct' })
		if (!isPasswordConfirmed) return res.status(400).send({ message: 'The password confirmation does not match' })

		const hashedPassword = await bcrypt.hash(req.body.password, 10)

		await prisma.user.update({
			where: {
				id: req.user.id
			},
			data: {
				password: hashedPassword,
			}
		})

		res.status(200).send({ message: 'Password updated successfully' })
	} catch (error) {
		next(error)
	}
})

module.exports = router
