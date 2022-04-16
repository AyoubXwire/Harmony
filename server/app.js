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

app.use('/api/', require('./routes/index'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/roles', require('./routes/roles'))
app.use('/api/users', require('./routes/users'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/clients', require('./routes/clients'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/timesheet', require('./routes/timesheet'))

module.exports = app
