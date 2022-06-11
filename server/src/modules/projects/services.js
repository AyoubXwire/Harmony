import prisma from '#prisma'

export async function getAll(req, res, next) {
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
			projects = await prisma.project.findMany({
				include: {
					_count: true,
					client: true,
					users: {
						include: {
							user: true
						}
					}
				}
			})
		}
		
		res.json(projects)
		
	} catch (error) {
		next(error)
	}
}

export async function create(req, res, next) {
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

export async function remove(req, res, next) {
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

export async function update(req, res, next) {
	try {
		const projectId = Number(req.params.id)

		await prisma.project.update({
			where: {
				id: projectId
			},
			data: {
				name: req.body.name,
				price: Number(req.body.price),
				startDate: req.body.startDate,
        		endDate: req.body.endDate,
			}
		})

		res.status(200).send()
	} catch (error) {
		next(error)
	}
}

export async function getAssignedUsers(req, res, next) {
	try {
		const projectId = Number(req.params.id)

		const users = await prisma.projectAssign.findMany({
			where: {
				projectId: projectId
			},
			select: {
				user: true
			}
		})

		res.json(users)
		
	} catch (error) {
		next(error)
	}
}

export async function assignUser(req, res, next) {
	try {
		const userId = Number(req.params.userId)
		const projectId = Number(req.params.projectId)

		await prisma.projectAssign.create({
			data: {
				projectId: projectId,
				userId: userId
			}
		})
		
	} catch (error) {
		next(error)
	}
}
