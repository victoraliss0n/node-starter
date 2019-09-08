import { Router } from 'express'
import NotificationController from '../app/controllers/NotificationController'
import authMiddleware from '../app/middlewares/auth.middleware'
const routes = new Router()

const notificationController = new NotificationController()
routes.get(
  '/notification',
  authMiddleware,
  notificationController.all.bind(notificationController)
)

export default routes
