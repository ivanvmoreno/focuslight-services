const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    focused: {
        type: Boolean,
        default: false,
    },
    name: {
        first: {
            type: String,
            required: true,
            trim: true,
        },
        last: {
            type: String,
            required: true,
            trim: true,
        },
    },
    team: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('User', userSchema)