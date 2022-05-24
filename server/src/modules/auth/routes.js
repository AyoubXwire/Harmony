const router = require('express').Router()
const auth = require('./middleware')
const services = require('./services')

router.post('/login', services.login)

router.get('/userbytoken', auth.verifyAuth, services.getUserByToken)

router.put('/update-password', auth.verifyAuth, services.updatePassword)

module.exports = router
