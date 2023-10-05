const propertyController = require('../controllers/PropertyController')
const router = require('express').Router();
const Validators = require('../validators/Validators')
const JwtService = require('../services/JwtService')

router.post('/', JwtService.authenticateToken, Validators.createProperty, propertyController.create)
router.get('/', JwtService.authenticateToken, propertyController.findAll)
router.get('/:id', JwtService.authenticateToken, propertyController.find)
router.put('/:id', JwtService.authenticateToken, propertyController.update)
router.delete('/:id', JwtService.authenticateToken, propertyController.deleteById)

module.exports = router