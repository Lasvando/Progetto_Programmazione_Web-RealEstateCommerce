const propertyController = require('../controllers/PropertyController')
const router = require('express').Router();
const Validators = require('../validators/Validators')

router.post('/',Validators.createProperty, propertyController.create)
router.get('/', propertyController.findAll)
router.get('/:id', propertyController.find)
router.put('/:id', propertyController.update)
router.delete('/:id', propertyController.deleteById)

module.exports = router