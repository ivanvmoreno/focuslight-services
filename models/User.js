const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    focused: {
        type: Boolean,
        default: false,
    },
    id: {
        type: Number,
        unique: true,
        required: true,
        min: 1,
    },
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
    },
    team: Number,
    webhooks: [{
        name: String,
        endpoint: String,
    }],
})

const userModel = mongoose.model('User', userSchema)

// Middleware to enforce auto-increment of User.id
userSchema.pre('save', async next => {
    if (this.isNew) {
        this.id = await userModel.count()
    } else {
        next()
    }
})

module.exports = userModel