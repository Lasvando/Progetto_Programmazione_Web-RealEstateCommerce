const transactionController = require('../controllers/TransactionController')
const router = require('express').Router();
const Validators = require('../validators/Validators')

router.post('/',Validators.createTransaction, transactionController.create)
router.get('/', transactionController.findAll)
router.get('/:id', transactionController.find)
router.put('/:id', transactionController.update)
router.delete('/:id', transactionController.deleteById)

module.exports = router