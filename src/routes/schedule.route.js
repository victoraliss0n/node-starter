import { Router } from 'express'
import ScheduleController from '../app/controllers/ScheduleController'
import authMiddleware from '../app/middlewares/auth.middleware'
const routes = new Router()

const scheduleController = new ScheduleController()
routes.get(
  '/schedule',
  authMiddleware,
  scheduleController.all.bind(scheduleController)
)

export default routes
