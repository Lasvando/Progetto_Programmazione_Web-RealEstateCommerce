const { validationResult } = require("express-validator");
const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const create = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let jwt = {}
    let user = {}
    
    // in case request params meet the validation criteria
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    try {
      user = await UserService.create(
        username,
        email,
        password,
        phone
      );

      jwt = await JwtService.generateAccessToken({
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }

    return res.status(201).send({ user, jwt });
  }
  res.status(422).json({ errors: errors.array() });
};

const findAll = async (req, res) => {
  let users = {}

  try {
    users = await UserService.findAll();
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

  return res.status(200).send(users);
};

const find = async (req, res) => {
  let user = {}
  
  try {
    user = await UserService.find(req.params.id);
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

  return res.status(200).send(user);
};

const update = async (req, res) => {};

const deleteById = async (req, res) => {
  try {
    await UserService.deleteById(req.params.id);
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
