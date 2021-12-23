const router = require('express').Router()

const index = require('./index')
const user = require('./users/users')

router.use("/",index)
router.use("/users",user)

module.exports = router