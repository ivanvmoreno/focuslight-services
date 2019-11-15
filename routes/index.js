const { Router } = require('express')
const v1ApiController = require('./v1')

const router = Router()

router.use('/v1', v1ApiController)

module.exports = router