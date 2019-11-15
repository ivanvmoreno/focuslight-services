const { Router } = require('express')
const userController = require('../../controllers/user')

const router = Router()

router.use('/user', userController)

module.exports = router