
const teste = {
        username: 'root',
        password: null,
        database: 'dbcategoriestest',
        host: '127.0.0.1',
        dialect: 'mysql'
      }
    
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize(teste)
    const CategoryMock = sequelize.define('CategoryMock', {
        name: Sequelize.STRING
    })

module.exports = { sequelize, CategoryMock }


