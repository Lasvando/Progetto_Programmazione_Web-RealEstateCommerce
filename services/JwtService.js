const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// get config vars
dotenv.config();

const generateAccessToken = async (payload) => {
  return jwt.sign({ payload }, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });
};
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
