import 'dotenv/config'

import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// routes
import authRouter from '#modules/auth/routes.js'
import postsRouter from '#modules/posts/routes.js'
import rolesRouter from '#modules/roles/routes.js'
import usersRouter from '#modules/users/routes.js'
import projectsRouter from '#modules/projects/routes.js'
import clientsRouter from '#modules/clients/routes.js'
import contactsRouter from '#modules/contacts/routes.js'
import timesheetRouter from '#modules/timesheet/routes.js'

app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.use('/api/roles', rolesRouter)
app.use('/api/users', usersRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/timesheet', timesheetRouter)

export default app
