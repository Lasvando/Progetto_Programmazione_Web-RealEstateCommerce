const {body} = require('express-validator')

const createUser = [
  body('username', 'username is mandatory').notEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'password is mandatory').notEmpty(),
  body('password-confirm', 'password-confirm is mandatory').notEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
  body('roleId', 'roleId is mandatory').notEmpty(),
  body('phone', 'phone number is mandatory').notEmpty(),
  body('phone', 'phone is not valid').isMobilePhone('it-IT')
]

const createRole = [
  body('name', 'role name does not Empty').notEmpty(),
]

const createProperty = [
  body('title', 'title is mandatory').notEmpty(),
  body('description', 'description is mandatory').notEmpty(),
  body('address', 'address is mandatory').notEmpty(),
  body('price', 'price is mandatory').notEmpty(),
  body('price', 'price has to be a float and cannot be minor than 0').isFloat({min: 0}),
  body('userId', 'userId is mandatory').notEmpty(),
]

const createTransaction = [
  body('debit_card', 'debit_card number is mandatory').notEmpty(),
  body('debit_card', 'debit_card number is not valid').isCreditCard({
    provider: 'visa' | 'amex' | 'mastercard'
  }),
  body('debit_card_issue_date', 'debit_card_issue_date is mandatory').notEmpty(),
  body('debit_card_issue_date', 'debit_card_issue_date is not valid').isISO8601().isDate(),
  body('cvv', 'cvv is mandatory').notEmpty(),
  body('cvv', 'cvv should be integer').isInt(),
  body('userId', 'userId is mandatory').notEmpty(),
  body('propertyId', 'propertyId is mandatory').notEmpty()
]

module.exports = {
  createUser,
  createRole,
  createProperty,
  createTransaction
}