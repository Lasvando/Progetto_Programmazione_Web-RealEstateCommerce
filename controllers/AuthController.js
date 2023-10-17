const {validationResult} = require('express-validator')
const AuthService = require('../services/AuthService')
const JwtService = require('../services/JwtService')


const login = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        let user = {};
        
        try {
            user = await AuthService.login(req.body.email, req.body.password)
        } catch (error) {
            return res.status(500).json({errors: error})
        }
        
        if(!user) return res.status(401).json({errors: "Email not registered or wrong combination"})

        const jwt = await JwtService.generateAccessToken({
            id: user.id,
            username: user.username,
            email: user.email,
        })

        return res.status(200).send({jwt, expiresIn: 180, userId: user.id, roleId: user.roleId, username: user.username})
    }
    res.status(422).json({errors: errors.array()})
}

const register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        let user = {}
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const roleId = req.body.roleId;
        const phone = req.body.phone;

        try {
            user = await AuthService.register(username, email, password, roleId, phone)
        } catch (error) {
            return res.status(500).json({errors: error})
        }
        
        const jwt = await JwtService.generateAccessToken({
            id: user.id,
            username: user.username,
            email: user.email
        })
        
        return res.status(200).send({user, jwt, expiresIn: 1800, userId: user.id, roleId: user.roleId, username: user.username})
    }
    res.status(422).json({errors: errors.array()})
}

module.exports = {
    login,
    register
}