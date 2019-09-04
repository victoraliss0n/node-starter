import { Router } from 'express'
import UserController from '../app/controllers/UserController'
import authMiddleware from '../app/middlewares/auth.middleware'
const routes = new Router()

const userController = new UserController()
routes.post('/users', userController.create.bind(userController))
routes.put('/users', authMiddleware, userController.update.bind(userController))
routes.get(
  '/providers',
  authMiddleware,
  userController.allProviders.bind(userController)
)

export default routes
