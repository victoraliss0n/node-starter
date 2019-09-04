import express from 'express'
import path from 'path'
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
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
  }

  routes() {
    this.server.use(this.allRoutes)
  }
}

export default new App().server
