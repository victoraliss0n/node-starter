import { Router } from 'express'
import multer from 'multer'
import FileController from '../app/controllers/FileController'
import authMiddleware from '../app/middlewares/auth.middleware'
import multerConfig from '../config/multer'
const upload = multer(multerConfig)
const routes = new Router()

const fileController = new FileController()
routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  fileController.create.bind(fileController)
)

export default routes
