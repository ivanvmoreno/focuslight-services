const userModel = require('../../models/User')
const logger = require('../../modules/logger')
const ERRORS = require('../../config/errors')
const ObjectId = require('mongoose').Types.ObjectId

const getUserStatus = async ({ params: { id } }, res) => {
    try {
        const user = await userModel.findOne({ _id: new ObjectId(id) })
        const { focused } = user
        res.send({ focused })
    } catch(err) {
        logger.error(err)
        res.status(400).send(ERRORS.NOT_FOUND)
    }
}


const postUserStatus = async ({ query: { focused }, params: { id } }, res) => {
    try {
        const user = await userModel.findOne({ _id: new ObjectId(id) })
        user.focused = focused
        await user.save()
        logger.info(`Updated user ${id} status to ${focused ? 'focused' : 'not focused'}`)
        res.sendStatus(200)
    } catch(err) {
        logger.error(err)
        res.sendStatus(500)
    }   
}

const createUser = async ({ body }, res) => {
    try {
        const { email, name, team = undefined } = body
        const user = new userModel({ email, name, team })
        await user.save()
        logger.info(`User ${user._id} created`)
        res.sendStatus(200)
    } catch(err) {
        logger.error(err)
        res.sendStatus(500)
    }
}

module.exports = {
    createUser,
    getUserStatus,
    postUserStatus
}