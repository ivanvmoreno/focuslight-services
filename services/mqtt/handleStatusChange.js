const { getTeamWebhooks } = require('../team/') 
const userModel = require('../../models/User')
const ObjectId = require('mongoose').Types.ObjectId
const mqtt = require('../../libraries/mqtt')
const fetch = require('isomorphic-unfetch')
const logger = require('../../libraries/logger')

const mqttPublishStatus = (userId, payload) => mqtt.publish(`/user/${userId}`, payload, { retain: true })

const userToJson = (userId, focused) => JSON.stringify({ userId, focused: focused ? 1 : 0 })

const parseMqttMessage = message => JSON.parse(message.toString())

const triggerWebhooks = (webhooks, payload) => {
    return Promise.all(webhooks.map(e => 
        fetch(e.endpoint, { 
            type: 'post', 
            headers: { 'Content-Type': 'application/json' },
            body: payload,
        })
    ))
}

const handleMqttUserStatusChange = message => {
    const { userId, focused } = parseMqttMessage(message)
    handleUserStatusChange(userId, focused)
}

const handleUserStatusChange = async (userId, newStatus) => {
    try {
        newStatus = typeof newStatus === 'string' 
            ? JSON.parse(newStatus.toLowerCase())
            : newStatus ? true : false
        const payload = userToJson(userId, newStatus)
        mqttPublishStatus(userId, payload)
        const user = await userModel.findOne({ _id: new ObjectId(userId) })
        user.focused = newStatus
        await user.save()
        logger.info(`Updated user ${userId} status to ${newStatus ? 'focused' : 'not focused'}`)
        let webhooks = user.team
            ? [...await getTeamWebhooks(user.team), ...user.webhooks]
            : user.webhooks
        await triggerWebhooks(webhooks, payload)
    } catch(err) {
        logger.error(err)
    }
}

module.exports = {
    handleMqttUserStatusChange,
    handleUserStatusChange,
    userToJson
}