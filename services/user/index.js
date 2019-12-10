const userModel = require('../../models/User')
const logger = require('../../modules/logger')
const ERRORS = require('../../config/errors')

const getUserStatus = async ({ params: { id } }, res) => {
    try {
        const user = await userModel.findOne({ id: parseInt(id) })
        const { focused } = user
        res.send({ focused })
    } catch(err) {
        res.status(400).send(ERRORS.NOT_FOUND)
    }
}


const postUserStatus = async ({ query: { focused }, params: { id } }, res) => {
    try {
        const user = await userModel.findOne({ id: parseInt(id) })
        user.focused = focused
        await user.save()
        logger.info(`Updated user ${id} status to ${focused ? 'focused' : 'not focused'}`)
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(500)
    }   
}

module.exports = {
    getUserStatus,
    postUserStatus
}