const User = require('../models/User');

const register = async (username, email, password, phone) => {

    var data = {
      username,
      email,
      password,
      phone
    }
    
    const user = await User.create(data)
    const result = await User.findByPk(user.id)

    return result;
}

const login = async (email, password) => {
    password = crypto.createHash('sha256').update(password).digest('base64');
    const user = await User.findOne({
        where: {
            email: email,
            password: password
        },
    })

    if(!user) return false;

    return user
}

module.exports = {
    login,
    register
}