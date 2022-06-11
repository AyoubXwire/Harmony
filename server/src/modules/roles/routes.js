import { Router } from 'express'
import * as auth from '#modules/auth/middleware.js'
import * as services from './services.js'

const router = Router()

router.get('/', auth.verifyAuth, auth.verifyRole(auth.ROLES.admin), services.getAll)

export default router