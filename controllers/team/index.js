const { Router } = require('express')
const { createTeam, getTeamList, addUserToTeam } = require('../../services/team')

const router = Router()

router.get('/all', getTeamList)
router.post('/', createTeam)
router.post('/:id/users', addUserToTeam)

module.exports = router