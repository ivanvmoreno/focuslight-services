const teamModel = require('../../models/Team')
const logger = require('../../libraries/logger')
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

const getTeamWebhooks = async (teamId) => {
    const team = await teamModel.findOne({ _id: new ObjectId(teamId) })
    return team.webhooks
}

module.exports = {
    createTeam,
    getTeamWebhooks
}