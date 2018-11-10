
const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const indexModel = require('../models/index')


router.get('/categories', categoryController.all.bind(null, indexModel.models))
router.post('/categories', categoryController.create.bind(null, indexModel.models))
router.delete('/categories', categoryController.deleteAll.bind(null, indexModel.models))
router.delete('/categories/:id', categoryController.destroyOne.bind(null, indexModel.models))
router.get('/categories/:id', categoryController.editForm.bind(null, indexModel.models))
router.put('/categories/:id', categoryController.editOne.bind(null, indexModel.models))

module.exports = router