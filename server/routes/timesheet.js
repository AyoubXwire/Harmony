const express = require('express')
const router = express.Router()
const prisma = require('../db')
const { getNextWorkDate } = require('../helpers/timesheet')
const { verifyAuth } = require('../middleware/auth')

router.get('/', verifyAuth, async function (req, res, next) {
	try {
        let timesheets = []

        if (req.query.assigned) {
            timesheets = await prisma.timeSheet.findMany({
                where: {
                    userId: req.user.id
                },
                orderBy: {
                    date: 'desc'
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
                date: req.body.date
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

router.get('/latest-date', verifyAuth, async function (req, res, next) {
	try {
        const lastDay = await prisma.timeSheet.findFirst({
            where: {
                userId: req.user.id
            },
            orderBy: {
                date: 'desc'
            },
            select: {
                date: true
            }
        })

        lastDay.date = getNextWorkDate(lastDay.date)

		res.json(lastDay)
	} catch (error) {
		next(error)
	}
})

module.exports = router
