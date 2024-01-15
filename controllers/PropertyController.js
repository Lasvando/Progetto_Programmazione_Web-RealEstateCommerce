const Property = require("../models/Property");
const PropertyImage = require("../models/PropertyImage");
const { where } = require("sequelize");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const dotenv = require("dotenv");
const fs = require('fs')
const path = require('path');

// get config vars
dotenv.config();

const create = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let result = {};
    let data = [];
    req.body.userId = req.user.payload.id;
    try {
      const property = await Property.create(req.body);
      req.files.forEach((element) => {
        data.push({
          filename: element.filename,
          mime_type: element.mimetype,
          link:
            process.env.BASE_URL +
            process.env.PORT +
            "/properties/" +
            element.filename,
          propertyId: property.id,
        });
      });

      const propertyImage = await PropertyImage.bulkCreate(data, {
        returning: true,
      });
      result = await Property.findByPk(property.id, {
        include: [User],
      });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }

    return res.status(201).send(result);
  }

  res.status(422).json({ errors: errors.array() });
};

const findAll = async (req, res) => {
  let properties = {};
  try {
    properties = await Property.findAll({
      include: [User, PropertyImage],
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

  res.status(200).send(properties);
};

const find = async (req, res) => {
  let property = {};
  try {
    property = await Property.findByPk(req.params.id, {
      include: [User, PropertyImage],
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

  if (!property) return res.status(404).send();

  res.status(200).send(property);
};

const update = async (req, res) => {
  let property = {};
  let data = []

  try {
    property = await Property.findByPk(req.params.id, {
      include: [User, PropertyImage],
    });

    let imageIdToDelete = [];
    if(req.body.oldIds == undefined) req.body.oldIds = []
    
    property.property_images.forEach(image => {
      isPresent = false;
      for(let i=0; i < req.body.oldIds.length; i++){
        if(req.body.oldIds[i] == image.id) 
          isPresent = true;
      }

      if(!isPresent)
        imageIdToDelete.push(image.id)
    });
    
    if (!property) return res.status(404).send();

    if (req.body.title) property.title = req.body.title;
    if (req.body.description) property.description = req.body.description;
    if (req.body.address) property.address = req.body.address;
    if (req.body.price) property.price = req.body.price;

    //Remove old images that are no more required
    for(let i=0; i<imageIdToDelete.length; i++){
      PropertyImage.destroy({ where: { id: imageIdToDelete[i] } });
    }

    req.files.forEach((element) => {
      data.push({
        filename: element.filename,
        mime_type: element.mimetype,
        link:
          process.env.BASE_URL +
          process.env.PORT +
          "/properties/" +
          element.filename,
        propertyId: property.id,
      });
    });

    const propertyImage = await PropertyImage.bulkCreate(data, {
      returning: true,
    });

    property.save();
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

  res.status(200).send(property);
};

const deleteById = async (req, res) => {
  try {
    let property = await Property.findByPk(req.params.id, { include: [PropertyImage]})
  
    property.property_images.forEach(image => {
      fs.unlinkSync(path.join(__dirname, '..','/public/properties/' + image.filename));
    });

    await Property.destroy({ where: { id: req.params.id } });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

  res.status(204).send();
};

module.exports = {
  create,
  findAll,
  find,
  update,
  deleteById,
};
