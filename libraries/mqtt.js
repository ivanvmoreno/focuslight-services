const mqtt = require('mqtt')
const { MQTT: { ENDPOINT, PORT } } = require('../config/constants')

class MQTT {
    constructor() {
        if (!this._client) {
            this._client = this.connect()
        }
        return this._client
    }

    connect() {
        return mqtt.connect(`mqtt://${ENDPOINT}:${PORT}`, {
            username: process.env.MQTT_USER,
            password: process.env.MQTT_PASSWORD,
        })
    }
}

module.exports = new MQTT()