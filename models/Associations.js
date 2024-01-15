const User = require('./User')
const Property = require('./Property')
const Transaction = require('./Transaction')
const PropertyImage = require('./PropertyImage')

const associate = () => {
    //PROPERTY-USER ONE-MANY
    Property.belongsTo(User)
    User.hasMany(Property)

    //USER-TRANSACTION ONE-MANY
    Transaction.belongsTo(User)
    User.hasMany(Transaction)

    //PROPERTY-TRANSACTION ONE-ONE
    Transaction.belongsTo(Property)
    Property.hasOne(Transaction)

    //PROPERTY_IMAGE-PROPERTY
    PropertyImage.belongsTo(Property, { onDelete: 'cascade' })
    Property.hasMany(PropertyImage)
}

module.exports = associate