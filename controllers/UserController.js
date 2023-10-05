const {validationResult} = require('express-validator')
var crypto = require('crypto'); 
const User = require('../models/User');
const { where } = require('sequelize');
const Role = require('../models/Role');

const create = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      // in case request params meet the validation criteria

      var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
      const date = new Date().toISOString();

      var data = {
        username: req.body.username,
        email: req.body.email,
        password,
        roleId: req.body.roleId,
        phone: req.body.phone
      }
      
      const user = await User.create(data)
      const result = await User.findByPk(user.id, {
        include: [Role]
      })

      return res.status(201).send(result)
    }
    res.status(422).json({errors: errors.array()})
}

const findAll = async (req, res) => {
    const users = await User.findAll({
      include: [Role]
    })

    return res.status(200).send(users)
}

const find = async (req, res) => {
  const users = await User.findByPk(req.params.id)

  return res.status(200).send(users)
}

const update = async (req, res) => {
    
}

const deleteById = async (req, res) => {
    User.destroy({where: {id: req.params.id}})
    res.status(204).send();
}

module.exports = {
    create,
    findAll,
    find,
    update,
    deleteById
}