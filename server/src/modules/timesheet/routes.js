import { Router } from 'express'
import * as auth from '#modules/auth/middleware.js'
import * as services from './services.js'

const router = Router()

router.get('/', auth.verifyAuth, services.getAll)

router.post('/', auth.verifyAuth, services.create)

router.get('/latest-date', auth.verifyAuth, services.getLatestDate)

export default router
