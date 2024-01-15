const { validationResult } = require("express-validator");
const AuthService = require("../services/AuthService");
const JwtService = require("../services/JwtService");

const login = async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        let user = req.user;
        console.log(user);
        if (!user)
            return res
                .status(401)
                .json({ errors: "Email not registered or wrong combination" });

        const jwt = await JwtService.generateAccessToken({
            id: user.id,
            username: user.username,
            email: user.email,
        });

        return res
            .status(200)
            .send({
                jwt,
                expiresIn: 1800,
                userId: user.id,
                username: user.username,
            });
    }
    res.status(422).json({ errors: errors.array() });
};

const register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let user = req.user;

        const jwt = await JwtService.generateAccessToken({
            id: user.id,
            username: user.username,
            email: user.email,
        });

        return res
            .status(200)
            .send({
                user,
                jwt,
                expiresIn: 1800,
                userId: user.id,
                username: user.username,
            });
    }
    res.status(422).json({ errors: errors.array() });
};

module.exports = {
    login,
    register,
};
