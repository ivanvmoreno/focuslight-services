const { Router } = require('express')
const userController = require('../../controllers/user')
const teamController = require('../../controllers/team')

const router = Router()

router.use('/user', userController)
router.use('/team', teamController)

module.exports = router