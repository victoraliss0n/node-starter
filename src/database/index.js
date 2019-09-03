import Sequelize from 'sequelize'

import User from '../app/models/User'

import databaseConfig from '../config/database'

class Database {
  constructor(Models = [User]) {
    this.Models = Models
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    this.Models.map(Model => Model.init(this.connection))
  }
}
export default new Database()
