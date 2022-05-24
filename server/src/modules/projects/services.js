const prisma = require('../../prisma/db')

async function getAll(req, res, next) {
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
}

async function create(req, res, next) {
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
}

async function remove(req, res, next) {
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
}

async function update(req, res, next) {
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
}

module.exports = {
    getAll,
    create,
    remove,
    update
}