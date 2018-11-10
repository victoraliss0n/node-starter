
const express = require('express')
const path = require('path')
const app = express()
const categories = require('./src/routes/category')
const model = require('./src/models/index')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(require('cors')())
app.use('/', categories)

const port = process.env.PORT || 12209

const configureServer = async () => {
    try {
        await model.sequelize.sync( {force: false} )
    } catch (error) {
        console.log(error)
    }
    const isValidServer = await app.listen(port)
    if (isValidServer) {
        console.log(`Connected - Port: ${port}`)
    }
} 
configureServer()
