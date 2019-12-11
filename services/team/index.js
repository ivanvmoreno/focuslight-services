const teamModel = require('../../models/Team')
const logger = require('../../modules/logger')
const ERRORS = require('../../config/errors')
const ObjectId = require('mongoose').Types.ObjectId

const createTeam = async ({ body }, res) => {
    try {
        const { email, name, users = undefined } = body
        const team = new teamModel({ email, name, users })
        await team.save()
        logger.info(`Team ${team._id} created`)
        res.sendStatus(200)
    } catch(err) {
        logger.error(err)
        res.sendStatus(500)
    }
}

module.exports = {
    createTeam,
}