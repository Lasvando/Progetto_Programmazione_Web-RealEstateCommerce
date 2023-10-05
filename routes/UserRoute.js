const userController = require('../controllers/UserController')
const router = require('express').Router();
const Validators = require('../validators/Validators')

router.post('/',Validators.createUser, userController.create)
router.get('/', userController.findAll)
router.get('/:id', userController.find)
router.put('/:id', userController.update)
router.delete('/:id', userController.deleteById)

module.exports = router