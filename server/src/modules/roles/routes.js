const router = require('express').Router()
const auth = require('../auth/middleware')
const services = require('./services')

router.get('/', auth.verifyAuth, auth.verifyRole(auth.ROLES.admin), services.getAll)

module.exports = router