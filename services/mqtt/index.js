const mqtt = require('../../libraries/mqtt')
const { handleMqttUserStatusChange } = require('./handleStatusChange')

const listen = () => {
    mqtt.subscribe('/status')
    mqtt.on('message', (topic, payload) => handleMqttUserStatusChange(payload))
}

module.exports = { listen }