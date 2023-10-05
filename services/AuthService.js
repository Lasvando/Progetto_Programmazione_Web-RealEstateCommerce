var crypto = require('crypto'); 
const User = require('../models/User');
const Role = require('../models/Role');

const register = async (username, email, password, roleId, phone) => {
    var password = crypto.createHash('sha256').update(password).digest('base64');

    var data = {
      username,
      email,
      password,
      roleId,
      phone
    }
    
    const user = await User.create(data)
    const result = await User.findByPk(user.id, {
      include: [Role]
    })

    return result;
}

const login = async (email, password) => {
    password = crypto.createHash('sha256').update(password).digest('base64');
    const user = await User.findOne({
        where: {
            email: email,
            password: password
        },
        include: [Role]
    })

    if(!user) return false;

    return user
}

module.exports = {
    login,
    register
}