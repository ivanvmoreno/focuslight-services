const { Router } = require('express')
const { getUserStatus, postUserStatus, createUser } = require('../../services/user')

const router = Router()

router.post('/', createUser)
router.get('/:id/status', getUserStatus)
router.post('/:id/status', postUserStatus)

module.exports = router