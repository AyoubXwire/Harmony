const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
		let projects = []

		if (req.query.assigned) {
			projects = await prisma.project.findMany({
				where: {
					users: {
						some: {
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

module.exports = router
