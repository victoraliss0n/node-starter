import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import User from '../app/models/User'

import databaseConfig from '../config/database'
import File from '../app/models/File'
import Appointment from '../app/models/Appointments'

class Database {
  constructor(Models = [User, File, Appointment]) {
    this.Models = Models
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    this.Models.map(Model => Model.init(this.connection)).map(
      Model => Model.associate && Model.associate(this.connection.models)
    )
  }

  async mongo() {
    await mongoose.connect('mongodb://mongodb/node-starter-mongodb', {
      useNewUrlParser: true,
    })
  }
}
export default new Database()
