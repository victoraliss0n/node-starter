import { Router } from 'express'
import AppointmentController from '../app/controllers/AppointmentController'
import authMiddleware from '../app/middlewares/auth.middleware'
const routes = new Router()

const appointmentController = new AppointmentController()
routes.post(
  '/appointment',
  authMiddleware,
  appointmentController.create.bind(appointmentController)
)
routes.get(
  '/appointment',
  authMiddleware,
  appointmentController.all.bind(appointmentController)
)

routes.delete(
  '/appointment/:id',
  authMiddleware,
  appointmentController.delete.bind(appointmentController)
)

export default routes
