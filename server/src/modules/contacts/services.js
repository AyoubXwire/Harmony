import prisma from '#prisma'

export async function getAll(req, res, next) {
	try {
		const contacts = await prisma.clientContact.findMany({
			include: {
				client: true
			}
		})

		res.json(contacts)
	} catch (error) {
		next(error)
	}
}

export async function create(req, res, next) {
	try {
		await prisma.clientContact.create({
			data: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				phone: req.body.phone,
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}

export async function remove(req, res, next) {
	try {
		const contactId = Number(req.params.id)

		await prisma.clientContact.delete({
			where: {
				id: contactId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}

export async function update(req, res, next) {
	try {
		const contactId = Number(req.params.id)

		await prisma.clientContact.update({
			where: {
				id: contactId
			},
			data: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				phone: req.body.phone,
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}
