import { Router } from 'express'
import AvailableController from '../app/controllers/AvailableController'
import authMiddleware from '../app/middlewares/auth.middleware'
const routes = new Router()
const availableController = new AvailableController()
routes.get(
  '/provider/:id/available',
  authMiddleware,
  availableController.all.bind(availableController)
)
export default routes
