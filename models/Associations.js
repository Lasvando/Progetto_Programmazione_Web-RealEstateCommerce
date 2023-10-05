const Role = require('./Role')
const User = require('./User')
const Property = require('./Property')
const Transaction = require('./Transaction')

const associate = () => {
    //ROLE-USER ONE-MANY
    User.belongsTo(Role)
    Role.hasMany(User)

    //PROPERTY-USER ONE-MANY
    Property.belongsTo(User)
    User.hasMany(Property)

    //USER-TRANSACTION ONE-MANY
    Transaction.belongsTo(User)
    User.hasMany(Transaction)

    //PROPERTY-TRANSACTION ONE-ONE
    Transaction.belongsTo(Property)
    Property.hasOne(Transaction)
}

module.exports = associate