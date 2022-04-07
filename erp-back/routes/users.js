const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth, verifyRole, AUTH_ROLES } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
		const users = await prisma.user.findMany({
			include: {
				post: true,
				role: true
			}
		})

		res.json(users)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', verifyAuth, async function (req, res, next) {
	try {
		const userId = Number(req.params.id)

		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
			include: { post: true }
		})
        
		res.json(user)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const userId = Number(req.params.id)

		await prisma.user.delete({
			where: {
				id: userId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

router.put('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const userId = Number(req.params.id)

		await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				phone: req.body.phone,
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

module.exports = router
