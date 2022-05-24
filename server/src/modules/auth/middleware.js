const jwt = require('jsonwebtoken')
const prisma = require('../../prisma/db')

const ROLES = {
	admin: 'ADMIN',
	user: 'USER'
}

async function verifyAuth(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.status(401).send({ message: 'You need to be authenticated to do that' })

	jwt.verify(token, process.env.SECRET, async (error, email) => {
		if (error) return res.status(403).send({ message: 'Something went wrong while authenticating you' })

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
		if (req.user.role.name !== role) return res.status(403).send({ message: 'You do not have the permission to do that' })
		next()
	}
}

module.exports = {
    ROLES,
	verifyAuth,
	verifyRole
}