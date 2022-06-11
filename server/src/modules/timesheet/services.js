import prisma from '#prisma'
import * as helpers from './helpers.js'

export async function getAll(req, res, next) {
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
                    project: true,
                    user: true
                }
            })
        } else {
            timesheets = await prisma.timeSheet.findMany({
                include: {
                    project: true,
                    user: true
                },
                orderBy: {
                    date: 'desc'
                }
            })
        }
		
		res.json(timesheets)
	} catch (error) {
		next(error)
	}
}

export async function create(req, res, next) {
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
}

export async function getLatestDate(req, res, next) {
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

        lastDay.date = helpers.getNextWorkDate(lastDay.date)

		res.json(lastDay)
	} catch (error) {
		next(error)
	}
}

