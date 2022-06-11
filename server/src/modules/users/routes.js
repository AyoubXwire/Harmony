import { Router } from 'express'
import * as auth from '#modules/auth/middleware.js'
import * as services from './services.js'

const router = Router()

router.get('/', auth.verifyAuth, services.getAll)

router.get('/:id', auth.verifyAuth, services.getOne)

router.delete('/:id', auth.verifyAuth, auth.verifyRole(auth.ROLES.admin), services.remove)

router.put('/:id', auth.verifyAuth, auth.verifyRole(auth.ROLES.admin), services.update)

router.post('/', services.create)

export default router
