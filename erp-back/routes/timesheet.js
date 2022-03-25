const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { verifyAuth } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
        let timesheets = []

        if (req.query.assigned) {
            timesheets = await prisma.timeSheet.findMany({
                where: {
                    userId: req.user.id
                }
            })
        } else {
            timesheets = await prisma.timeSheet.findMany({})
        }
		
		res.json(timesheets)
	} catch (error) {
		next(error)
	}
})

module.exports = router
