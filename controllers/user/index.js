const { Router } = require('express')
const { getUserStatus, postUserStatus } = require('../../services/user')

const router = Router()

router.get('/:id/status', getUserStatus)
router.post('/:id/status', postUserStatus)

module.exports = router