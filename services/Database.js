const firebase = require('firebase')
const auth = JSON.parse(process.env.FIREBASE_AUTH)

module.exports = (() => {
    if (!this._firestore) {
        firebase.initializeApp(auth)
        this._firestore = firebase.firestore()
    }
    return this._firestore;
})()