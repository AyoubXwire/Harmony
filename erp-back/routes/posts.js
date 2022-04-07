const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth, verifyRole, AUTH_ROLES } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
		const posts = await prisma.userPost.findMany({
			include: {
				_count: true,
			}
		})

		res.json(posts)
	} catch (error) {
		next(error)
	}
})

router.post('/', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		await prisma.userPost.create({
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
		const postId = Number(req.params.id)

		await prisma.userPost.delete({
			where: {
				id: postId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

router.put('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const postId = Number(req.params.id)

		await prisma.userPost.update({
			where: {
				id: postId
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
