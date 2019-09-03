import { Router } from 'express'
import userRoute from './users.route'

const router = new Router()
router.use(userRoute)

export default router
