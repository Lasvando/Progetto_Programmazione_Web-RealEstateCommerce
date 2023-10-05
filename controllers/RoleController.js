const Role = require('../models/Role');
const { where } = require('sequelize');
const {validationResult} = require('express-validator');
const User = require('../models/User');

const create = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        let role = {}

        try {
            role = await Role.create(req.body)
        } catch (error) {
            return res.status(500).json({errors: error})
        }
        
        return res.status(201).send(role)
    }

    res.status(422).json({errors: errors.array()})
}

const findAll = async (req, res) => {
    let roles = {}

    try {
        roles = await Role.findAll({
            include: [User]
        });
    } catch (error) {
        return res.status(500).json({errors: error})
    }

    res.status(200).send(roles)
}

const find = async (req, res) => {
    let role = {}

    try {
        role = await Role.findByPk(req.params.id)
    } catch (error) {
        return res.status(500).json({errors: error})
    }
    
    if(!role) return res.status(404).send()

    res.status(200).send(role)
}

const update = async (req, res) => {

}

const deleteById = async (req, res) => {
    try {
        await Role.destroy({where: {id: req.params.id}})
    } catch (error) {
        return res.status(500).json({errors: error})
    }
    
    res.status(204).send()
}

module.exports = {
    create,
    findAll,
    find,
    update,
    deleteById
}