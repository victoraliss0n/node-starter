import 'dotenv/config'
import express from 'express'
import * as Sentry from '@sentry/node'
import path from 'path'
import routes from './routes/route'
import sentryConfig from './config/sentry'
import 'express-async-errors'
import './database/index'

class App {
  constructor(server = express(), allRoutes = routes) {
    this.server = server
    this.allRoutes = allRoutes
    Sentry.init(sentryConfig)
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler())
    this.server.use(express.json())
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
  }

  routes() {
    this.server.use(Sentry.Handlers.errorHandler())
    this.server.use(this.allRoutes)
  }
}

export default new App().server
