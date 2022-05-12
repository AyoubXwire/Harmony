const express = require('express')
const { timeSheet } = require('../db')
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
                },
                include: {
                    project: true
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

router.post('/', verifyAuth, async function (req, res, next) {
	try {
        const timesheets = req.body.timesheets
        const tempData = []

        timesheets.forEach(timesheet => {
            tempData.push({
                userId: req.user.id,
                projectId: timesheet.projectId,
                time: timesheet.time,
                comment: timesheet.comment,
                date: new Date().toISOString()
            })
        })

		await prisma.timeSheet.createMany({
            data: tempData
        })

		res.status(200).send()
	} catch (error) {
		next(error)
	}
})

module.exports = router
