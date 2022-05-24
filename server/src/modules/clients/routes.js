const router = require('express').Router()
const auth = require('../auth/middleware')
const services = require('./services')

router.get('/', auth.verifyAuth, services.getAll)

router.post('/', auth.verifyAuth, auth.verifyRole(auth.ROLES.admin), services.create)

router.delete('/:id', auth.verifyAuth, auth.verifyRole(auth.ROLES.admin), services.remove)

router.put('/:id', auth.verifyAuth, auth.verifyRole(auth.ROLES.admin), services.update)

module.exports = router
