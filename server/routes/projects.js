const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth, verifyRole, AUTH_ROLES } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
		let projects = []

		if (req.query.assigned) {
			projects = await prisma.project.findMany({
				where: {
					users: {
						every: {
							id: req.user.id
						}
					}
				}
			})
		} else {
			projects = await prisma.project.findMany({})
		}
		
		res.json(projects)
		
	} catch (error) {
		next(error)
	}
})

router.post('/', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		await prisma.project.create({
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
		const projectId = Number(req.params.id)

		await prisma.project.delete({
			where: {
				id: projectId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

router.put('/:id', verifyAuth, verifyRole(AUTH_ROLES.admin), async function (req, res, next) {
	try {
		const projectId = Number(req.params.id)

		await prisma.project.update({
			where: {
				id: projectId
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
