const routes = require('./routes')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./libraries/logger')
const { STAGES, SERVER } = require('./config/constants')
require('dotenv').config()

const mongoString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`

const app = express()

try {
    mongoose.connect(mongoString, { useNewUrlParser: true })
} catch(err) {
    logger.error(err)
}

app.use(cors({ origin: true }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use('/', routes)

if (STAGES.DEVELOPMENT.includes(process.env.STAGE)) 
    app.listen(
        SERVER.DEV_PORT, 
        () => logger.info(`Development server listening on port ${SERVER.DEV_PORT}`))