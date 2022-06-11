import { Router } from 'express'
import * as auth from './middleware.js'
import * as services from './services.js'

const router = Router()

router.post('/login', services.login)

router.get('/userbytoken', auth.verifyAuth, services.getUserByToken)

router.put('/update-password', auth.verifyAuth, services.updatePassword)

export default router
