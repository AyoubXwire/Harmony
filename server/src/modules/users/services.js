import prisma from '#prisma'
import bcrypt from 'bcrypt'

export async function getAll(req, res, next) {
	try {
		const filters = {}

		if (req.query.postId) {
			filters.postId = Number(req.query.postId)
		}

		if (req.query.name) {
			filters.OR = [
				{ firstName: { contains: req.query.name } },
				{ lastName: { contains: req.query.name } },
			]
		}

		const users = await prisma.user.findMany({
			where: filters,
			include: {
				_count: true,
				post: true,
				role: true,
			}
		})

		res.json(users)
	} catch (error) {
		next(error)
	}
}

export async function getOne(req, res, next) {
	try {
		const userId = Number(req.params.id)

		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
			include: { post: true }
		})

		res.json(user)
	} catch (error) {
		next(error)
	}
}

export async function remove(req, res, next) {
	try {
		const userId = Number(req.params.id)

		await prisma.user.delete({
			where: {
				id: userId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}

export async function update(req, res, next) {
	try {
		const userId = Number(req.params.id)

		await prisma.user.update({
			where: {
				id: userId
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

export async function create(req, res) {
	const email = req.body.email
	const password = req.body.password
	const password2 = req.body.password2
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const phone = req.body.phone

	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	if (user) return res.status(403).send({ message: 'The email provided already exists' })
	if (password !== password2) return res.status(403).send({ message: 'The password confirmation does not match' })

	const hashedPassword = await bcrypt.hash(password, 10)

	await prisma.user.create({
		data: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			password: hashedPassword,
			postId: 1
		}
	})

	res.status(200).send()
}

