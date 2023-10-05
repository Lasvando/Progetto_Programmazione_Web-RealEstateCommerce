const Property = require('../models/Property');
const { where } = require('sequelize');
const {validationResult} = require('express-validator');
const User = require('../models/User');
const Transaction = require('../models/Transaction')

const create = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        let result = {}

        try {
            const transaction = await Transaction.create(req.body)
            const result = await Transaction.findByPk(transaction.id, {
                include: [User, Property]
            })
        } catch (error) {
            return res.status(500).json({errors: error})
        }

        return res.status(201).send(result)
    }

    res.status(422).json({errors: errors.array()})
}

const findAll = async (req, res) => {
    let transactions = {}

    //TODO : FindAll solo delle transazione dell'utente loggato
    try {
        transactions = await Transaction.findAll({
            include:[User, Property]
        })
    } catch (error) {
        return res.status(500).json({errors: error})
    }

    res.status(200).send(transactions)
}

const find = async (req, res) => {
    let transaction = {}

    try {
         transaction = await Transaction.findByPk(req.params.id, {
            include: [User, Property]
        })
    } catch (error) {
        return res.status(500).json({errors: error})
    }

    if(!transaction) return res.status(404).send()

    res.status(200).send(transaction)
}

const update = async (req, res) => {
}

const deleteById = async (req, res) => {
    try {
        await Transaction.destroy({where: {id: req.params.id}})
    } catch (error) {
        return res.status(500).json({errors: error})
    }

    res.status(204).send()
}

module.exports = {
    create,
    find,
    findAll,
    update,
    deleteById
}