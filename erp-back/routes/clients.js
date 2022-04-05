const express = require('express')
const { client } = require('../db')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth, verifyRole, AUTH_ROLES } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
		const clients = await prisma.client.findMany({
			include: {
				_count: true
			}
		})

		res.json(clients)
	} catch (error) {
		next(error)
	}
})

router.post('/', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		console.log(req.body)

		await prisma.client.create({
			data: {
				name: req.body.name
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const clientId = Number(req.params.id)

		await prisma.client.delete({
			where: {
				id: clientId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

router.put('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const clientId = Number(req.params.id)

		await prisma.client.update({
			where: {
				id: clientId
			},
			data: {
				name: req.body.name
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

module.exports = router
