import prisma from '#prisma'

export async function getAll(req, res, next) {
	try {
		const posts = await prisma.userPost.findMany({
			include: {
				_count: true,
			}
		})

		res.json(posts)
	} catch (error) {
		next(error)
	}
}

export async function create(req, res, next) {
	try {
		await prisma.userPost.create({
			data: {
				name: req.body.name
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}

export async function remove(req, res, next) {
	try {
		const postId = Number(req.params.id)

		await prisma.userPost.delete({
			where: {
				id: postId
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}

export async function update(req, res, next) {
	try {
		const postId = Number(req.params.id)
		const postUsers = req.body.postUsers

		await prisma.userPost.update({
			where: {
				id: postId
			},
			data: {
				name: req.body.name,
				users: {
					set: [],
					connect: [{ id: 1 }, { id: 4 }]
				}
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}
