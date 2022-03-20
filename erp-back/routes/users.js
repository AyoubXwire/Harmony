const express = require('express')
const router = express.Router()
const prisma = require('../db')

router.get('/', async function (req, res, next) {
	try {
		const users = await prisma.user.findMany({
			include: { post: true }
		})

		res.json(users)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async function (req, res, next) {
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

module.exports = router
