
const express = require('express')
const path = require('path')
const app = express()
const user = require('./src/routes/user')
const model = require('./src/models/index')
const bodyParser = require('body-parser')

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
        console.log(error)
    }
    await app.listen(port)
    console.log(`Connected - Port: ${port}`)
 })()