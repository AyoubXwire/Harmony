const jwt = require('jsonwebtoken')
const prisma = require('../db')

async function verifyAuth(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.SECRET, async (error, email) => {
		console.log(error)

		if (error) return res.sendStatus(403)

		let user = await prisma.user.findUnique({
			where: {
				email: email
			},
			include: { post: true }
		})

		delete user.password
		req.user = user

		next()
	})
}

module.exports = {
    verifyAuth
}