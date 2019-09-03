import { Router } from 'express'
import UserController from '../app/controllers/UserController'
const routes = new Router()

const userController = new UserController()
routes.post('/users', userController.create.bind(userController))

export default routes
