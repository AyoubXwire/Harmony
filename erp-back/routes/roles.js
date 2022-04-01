const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth, verifyRole, AUTH_ROLES } = require('../middleware/auth')

router.get('/', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const roles = await prisma.userRole.findMany({
			include: {
				_count: true,
			}
		})

		res.json(roles)
	} catch (error) {
		next(error)
	}
})

module.exports = router