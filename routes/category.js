
const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const indexModel = require('../models/index')

router.get('/categories', categoryController.all.bind(null, indexModel.models))
router.post('/categories', categoryController.create.bind(null, indexModel.models))
router.delete('/deleteAll', categoryController.deleteAll.bind(null, indexModel.models))
router.delete('/delete/:id', categoryController.destroyOne.bind(null, indexModel.models))
router.get('/category/edit/:id', categoryController.editForm.bind(null, indexModel.models))
router.put('/category/edit/:id', categoryController.editOne.bind(null, indexModel.models))

module.exports = router