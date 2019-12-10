const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    email: String,
    id: {
        type: Number,
        unique: true,
        required: true,
        min: 1,
    },
    name: {
        type: String,
        required: true,
    },
    users: [Number],
    webhooks: [{
        name: String,
        endpoint: String,
    }],
})

const teamModel = mongoose.Model('Team', teamSchema)

// Middleware to enforce auto-increment of Team.id
teamSchema.pre('save', async next => {
    if (this.isNew) {
        this.id = await teamModel.count()
    } else {
        next()
    }
})

module.exports = teamModel