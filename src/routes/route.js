import { Router } from 'express'
import userRoute from './users.route'
import authRoute from './auth.route'
import fileRoute from './files.route'
import appointmentRoute from './appointment.route'
import scheduleRoute from './schedule.route'

const router = new Router()
router.use(userRoute)
router.use(authRoute)
router.use(fileRoute)
router.use(appointmentRoute)
router.use(scheduleRoute)

export default router
