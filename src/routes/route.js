import { Router } from 'express'
import userRoute from './users.route'
import authRoute from './auth.route'
import fileRoute from './files.route'

const router = new Router()
router.use(userRoute)
router.use(authRoute)
router.use(fileRoute)

export default router
