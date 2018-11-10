
const json = {
    username: 'root',
    password: null,
    database: 'dbcategories',
    host: '127.0.0.1',
    dialect: 'sqlite',
    operatorsAliases: false
  }
const Sequelize = require('sequelize')
const sequelize = new Sequelize(json)

const models = {}
const fs = require('fs')
const path = require('path')
fs.readdirSync(__dirname)
  .filter(file => file!=='index.js')
  .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file))
      models[model.name] = model
  })


module.exports = { sequelize, models }