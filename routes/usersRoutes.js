const express = require('express')
const { userRegister, userLogin, currentUser } = require('../controller/usersController')
const router = express.Router()

router.post("/register", userRegister)

router.post("/login", userLogin)

router.get("/current", currentUser)

module.exports = router