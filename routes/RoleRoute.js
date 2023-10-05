const roleController = require('../controllers/RoleController')
const router = require('express').Router();
const Validators = require('../validators/Validators')

router.post('/',Validators.createRole, roleController.create)
router.get('/', roleController.findAll)
router.get('/:id', roleController.find)
router.put('/:id', roleController.update)
router.delete('/:id', roleController.deleteById)

module.exports = router