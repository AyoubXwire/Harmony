const router = require('express').Router()
const auth = require('../auth/middleware')
const services = require('./services')

router.get('/', auth.verifyAuth, services.getAll)

router.post('/', auth.verifyAuth, services.create)

router.get('/latest-date', auth.verifyAuth, services.getLatestDate)

module.exports = router
