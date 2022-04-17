const express = require('express')
const router = express.Router()
const prisma = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { verifyAuth } = require('../middleware/auth')

router.post('/login', async function (req, res) {
	const email = req.body.email
	const password = req.body.password

	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	const isPasswordValid = await bcrypt.compare(password, user.password)

	if (!user || !isPasswordValid) return res.sendStatus(403)

	const accessToken = jwt.sign(email, process.env.SECRET)

	res.json({ accessToken: accessToken })
})

router.get('/userbytoken', verifyAuth, async function (req, res) {
	res.json({ user: req.user })
})

router.put('/update-password', verifyAuth, async function (req, res, next) {
	try {
		const isOldPasswordValid = await bcrypt.compare(req.body.oldPassword, req.user.password)
		const isPasswordConfirmed = req.body.password === req.body.password2

		if (!isOldPasswordValid || !isPasswordConfirmed) return res.status(403).send()

		const hashedPassword = await bcrypt.hash(req.body.password, 10)

		await prisma.user.update({
			where: {
				id: req.user.id
			},
			data: {
				password: hashedPassword,
				updatePassword: false
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

module.exports = router
