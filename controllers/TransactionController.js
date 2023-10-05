const Property = require('../models/Property');
const { where } = require('sequelize');
const {validationResult} = require('express-validator');
const User = require('../models/User');
const Transaction = require('../models/Transaction')

const create = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const transaction = await Transaction.create(req.body)
        const result = await Transaction.findByPk(transaction.id, {
            include: [User, Property]
        })

        return res.status(201).send(result)
    }

    res.status(422).json({errors: errors.array()})
}

const findAll = async (req, res) => {
    //TODO : FindAll solo delle transazione dell'utente loggato
    const transactions = await Transaction.findAll({
        include:[User, Property]
    })

    res.status(200).send(transactions)
}

const find = async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id, {
        include: [User, Property]
    })

    if(!transaction) return res.status(404).send()

    res.status(200).send(transaction)
}

const update = async (req, res) => {
}

const deleteById = async (req, res) => {
    await Transaction.destroy({where: {id: req.params.id}})

    res.status(204).send()
}

module.exports = {
    create,
    find,
    findAll,
    update,
    deleteById
}