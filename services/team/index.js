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

const getTeamList = async (req, res) => {
    const teams = await teamModel.find({})
    const teamsMap = {}
    teams.forEach(team => teamsMap[team._id] = team)
    res.send(teamsMap)
}

const getTeamWebhooks = async (teamId) => {
    const team = await teamModel.findOne({ _id: new ObjectId(teamId) })
    return team.webhooks
}

const addUserToTeam = async ({ query: { users }, params: { id: teamId } }, res) => {
    try {
        if (!Array.isArray(users)) users = [users]
        users = users.map(user => new ObjectId(user))
        const team = await teamModel.findOne({ _id: new ObjectId(teamId) })
        team.users = [...users, ...team.users]
        await team.save()
        res.send(team)
    } catch(err) {
        logger.error(err)
        res.sendStatus(500)
    }
}

module.exports = {
    createTeam,
    getTeamWebhooks,
    getTeamList,
    addUserToTeam,
}