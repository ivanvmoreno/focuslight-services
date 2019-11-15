const routes = require('./routes/')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { STAGES, SERVER } = require('./config/constants')

const app = express()

app.use(cors({ origin: true }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use('/', routes)

if (STAGES.DEVELOPMENT.includes(process.env.STAGE)) 
    app.listen(
        SERVER.DEV_PORT, 
        () => console.log(`👷 Development server listening on port ${SERVER.DEV_PORT}`))

module.exports = app