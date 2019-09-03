import express from 'express'
import routes from './routes/route'
import './database/index'

class App {
  constructor(server = express(), allRoutes = routes) {
    this.server = server
    this.allRoutes = allRoutes
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(this.allRoutes)
  }
}

export default new App().server
