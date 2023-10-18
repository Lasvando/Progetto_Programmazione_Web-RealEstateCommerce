const {Model, DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

class PropertyImage extends Model{}

PropertyImage.init({
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mime_type:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false  
    }
},{
    sequelize,
    modelName: 'property_image'
})

module.exports = PropertyImage