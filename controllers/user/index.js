const { Router } = require('express')
const { getUserStatus, getUsersList, postUserStatus, createUser } = require('../../services/user')

const router = Router()

router.get('/all', getUsersList)
router.post('/', createUser)
router.get('/:id/status', getUserStatus)
router.post('/:id/status', postUserStatus)

module.exports = router