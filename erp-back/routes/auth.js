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

module.exports = router
