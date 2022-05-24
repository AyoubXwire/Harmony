require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/auth', require('./modules/auth/routes'))
app.use('/api/posts', require('./modules/posts/routes'))
app.use('/api/roles', require('./modules/roles/routes'))
app.use('/api/users', require('./modules/users/routes'))
app.use('/api/projects', require('./modules/projects/routes'))
app.use('/api/clients', require('./modules/clients/routes'))
app.use('/api/contacts', require('./modules/contacts/routes'))
app.use('/api/timesheet', require('./modules/timesheet/routes'))

module.exports = app
