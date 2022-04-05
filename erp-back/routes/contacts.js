const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth, verifyRole, AUTH_ROLES } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
		const contacts = await prisma.clientContact.findMany({
			include: {
				client: true
			}
		})

		res.json(contacts)
	} catch (error) {
		next(error)
	}
})

router.post('/', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		await prisma.clientContact.create({
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

router.delete('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const contactId = Number(req.params.id)

		await prisma.clientContact.delete({
			where: {
				id: contactId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

router.put('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const contactId = Number(req.params.id)

		await prisma.clientContact.update({
			where: {
				id: contactId
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
