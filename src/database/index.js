import Sequelize from 'sequelize'

import User from '../app/models/User'

import databaseConfig from '../config/database'
import File from '../app/models/File'

class Database {
  constructor(Models = [User, File]) {
    this.Models = Models
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    this.Models.map(Model => Model.init(this.connection)).map(
      Model => Model.associate && Model.associate(this.connection.models)
    )
  }
}
export default new Database()
