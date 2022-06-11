import prisma from '#prisma'

prisma.$use(async (params, next) => {
    // Manipulate params here
    const result = await next(params)
    // See results here
    return result
})