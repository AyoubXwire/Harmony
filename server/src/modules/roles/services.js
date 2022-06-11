import prisma from '#prisma'

export async function getAll(req, res, next) {
	try {
		const roles = await prisma.userRole.findMany({
			include: {
				_count: true,
			}
		})

		res.json(roles)
	} catch (error) {
		next(error)
	}
}
