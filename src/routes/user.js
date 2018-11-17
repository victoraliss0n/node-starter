
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const indexModel = require('../models')


router.get('/users', userController.all.bind(null, indexModel.models))
router.post('/users', userController.create.bind(null, indexModel.models))
router.delete('/users', userController.destroyAll.bind(null, indexModel.models))
router.delete('/users/:id', userController.destroy.bind(null, indexModel.models))
router.put('/users/:id', userController.update.bind(null, indexModel.models))

module.exports = router