const express = require('express')
// controller functions
const { loginUser, signupUser } = require('../controller/usercontroller')
const router = express.Router()
// login route
router.post('/login', loginUser)
// signup route
router.post('/signupUser', signupUser)
module.exports = router