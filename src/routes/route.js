import { Router } from 'express'
import userRoute from './users.route'
import authRoute from './auth.route'

const router = new Router()
router.use(userRoute)
router.use(authRoute)

export default router
