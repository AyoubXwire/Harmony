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

router.post('/register', async function (req, res) {
	const email = req.body.email
	const password = req.body.password
	const password2 = req.body.password2
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const phone = req.body.phone
	const avatar = req.body.avatar

	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	if (user || password !== password2) return res.sendStatus(403)

	const hashedPassword = await bcrypt.hash(password, 10)

	await prisma.user.create({
		data: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			avatar: avatar,
			password: hashedPassword,
			postId: 1
		}
	})

	const accessToken = jwt.sign(email, process.env.SECRET)

	res.json({ accessToken: accessToken })
})

router.get('/userbytoken', verifyAuth, async function (req, res) {
	res.json({ user: req.user })
})

router.get('/secret', verifyAuth, function (req, res) {
	res.json({ user: req.user })
})

module.exports = router
