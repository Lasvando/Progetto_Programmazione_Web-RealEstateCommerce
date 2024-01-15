const AuthController = require('../controllers/AuthController')
const router = require('express').Router();
const Validators = require('../validators/Validators')
const passport = require('passport')

router.post('/login', Validators.login, passport.authenticate('login', { session: false }), AuthController.login)
router.post('/register', Validators.createUser, passport.authenticate('register', { session: false }), AuthController.register)

module.exports = router