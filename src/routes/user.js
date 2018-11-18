import express from 'express'
const router = express.Router()
import * as userController from '../controllers/user';

import indexModel from '../models'

router.get('/users', userController.all.bind(null, indexModel.models))
router.post('/users', userController.create.bind(null, indexModel.models))
router.delete('/users', userController.destroyAll.bind(null, indexModel.models))
router.delete('/users/:id', userController.destroy.bind(null, indexModel.models))
router.put('/users/:id', userController.update.bind(null, indexModel.models))

export default router