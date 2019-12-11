const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    users: [mongoose.Schema.Types.ObjectId],
    webhooks: [{
        name: {
            type: String,
            trim: true,
        },
        endpoint: {
            type: String,
            trim: true,
        },
    }],
})

module.exports = mongoose.Model('Team', teamSchema)