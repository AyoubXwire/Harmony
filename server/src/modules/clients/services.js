const prisma = require('../../prisma/db')

async function getAll(req, res, next) {
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
}

async function create(req, res, next) {
	try {
		await prisma.client.create({
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
}

async function update(req, res, next) {
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
}

module.exports = {
    getAll,
    create,
    remove,
    update
}
