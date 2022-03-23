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
app.use('/api/users', require('./routes/users'))

module.exports = app
