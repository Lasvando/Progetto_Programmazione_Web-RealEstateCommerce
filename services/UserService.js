var crypto = require('crypto'); 
const User = require('../models/User');
const Role = require('../models/Role');

const create = async (username, email, password, roleId, phone) => {
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

const findAll = async () => {
    const users = await User.findAll({
        include: [Role]
    })

    return users
}

const find = async (id) => {
    const user = await User.findByPk(id)

    return user
}

const update = async () => {

}

const deleteById = async (id) => {
    await User.destroy({where: {id: id}})

    return true
}

module.exports = {
    create,
    findAll,
    find,
    update,
    deleteById
}