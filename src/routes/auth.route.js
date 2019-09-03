import { Router } from 'express'
import AuthController from '../app/controllers/AuthController'
const routes = new Router()

const authController = new AuthController()
routes.post('/auth', authController.create.bind(authController))

export default routes
