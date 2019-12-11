const { Router } = require('express')
const { createTeam } = require('../../services/team')

const router = Router()

router.post('/', createTeam)

module.exports = router