const error = error => {
    console.log('❌ Error -', error)
}

const info = message => {
    console.log('⚠️ Info -', message)
}

module.exports = {
    error,
    info
}