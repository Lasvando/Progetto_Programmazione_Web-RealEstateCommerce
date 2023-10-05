const AuthController = require('../controllers/AuthController')
const router = require('express').Router();
const Validators = require('../validators/Validators')

router.post('/login', Validators.login, AuthController.login)
router.post('/register', Validators.createUser, AuthController.register)

module.exports = router