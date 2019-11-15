const db = require('../Database')
const { DATABASE: { COLLECTIONS } } = require('../../config/constants')
const ERRORS = require('../../config/errors')
require('dotenv').config()

const getUserStatus = async ({ params: { id } }, res) => {
    const snapshot = await db.collection(COLLECTIONS.USERS).doc(id).get()
    if (!ref.exists) res.status(400).send(ERRORS.NOT_FOUND)
    res.send(snapshot.data().focused)
}

const postUserStatus = async ({ query: { focused }, params: { id } }, res) => {
    const ref = await db.collection(COLLECTIONS.USERS).doc(id)
    try {
        await ref.update({ focused })
        const updatedSnapshot = await ref.get()
        res.send(updatedSnapshot.data())
    } catch (error) {
        console.log('Error ❌', error)
        const snapshot = await ref.get()
        if (!snapshot.exists) res.status(400).send(ERRORS.NOT_FOUND)
        res.status(500).send(ERRORS.INTERNAL_ERROR)
    }
}

module.exports = {
    getUserStatus,
    postUserStatus
}