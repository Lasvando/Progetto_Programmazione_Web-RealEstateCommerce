const transactionController = require('../controllers/TransactionController')
const router = require('express').Router();
const Validators = require('../validators/Validators')
const JwtService = require('../services/JwtService')

router.post('/', JwtService.authenticateToken, Validators.createTransaction, transactionController.create)
router.get('/', JwtService.authenticateToken, transactionController.findAll)
router.get('/:id', JwtService.authenticateToken, transactionController.find)
router.put('/:id', JwtService.authenticateToken, transactionController.update)
router.delete('/:id', JwtService.authenticateToken, transactionController.deleteById)
router.get('/find-already-booked/:propertyId', JwtService.authenticateToken, transactionController.findByUserAndPropertyId)

module.exports = router