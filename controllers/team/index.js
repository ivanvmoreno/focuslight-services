const { Router } = require('express')
const { createTeam, getTeamList } = require('../../services/team')

const router = Router()

router.get('/all', getTeamList)
router.post('/', createTeam)

module.exports = router