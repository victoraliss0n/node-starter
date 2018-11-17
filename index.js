import logger from './src/helpers/logger'
import express from 'express'
import path from 'path'
const app = express()
import user from './src/routes/user'
import model from './src/models/index'
import bodyParser from 'body-parser'

app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(require('cors')())
app.use('/', user)


;(async () => {
    const port = process.env.PORT || 4000
    try {
        await model.sequelize.sync( {force: true} )
    } catch (error) {
        logger.error(error)
    }
    try {
        await app.listen(port)
        logger.info(`CONNECTED: ${port}`)
    } catch (error) {
        logger.error(error)
    }
 })()