const jwt = require('jsonwebtoken')
const prisma = require('../db')

const AUTH_ROLES = {
	admin: 'ADMIN',
	user: 'USER'
}

async function verifyAuth(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.SECRET, async (error, email) => {
		if (error) return res.sendStatus(403)

		let user = await prisma.user.findUnique({
			where: {
				email: email
			},
			include: {
				post: true,
				role: true
			}
		})

		req.user = user

		next()
	})
}

function verifyRole(role) {
	return (req, res, next) => {
		if (req.user.role.name !== role) return res.sendStatus(403)
		next()
	}
}

module.exports = {
    AUTH_ROLES,
	verifyAuth,
	verifyRole
}