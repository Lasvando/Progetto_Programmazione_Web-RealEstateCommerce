const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./sequelize");
const associate = require("./models/Associations");
var cors = require("cors");

//DB table associations
associate();

//Passport strategies
require("./passport");

// get config vars
dotenv.config();

sequelize.sync().then(() => console.log("DB synced"));

const app = express();

//Static files
app.use(express.static("public"));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

app.use(morgan("common"));

const port = process.env.PORT || 5000;

//Routes
const authRoute = require("./routes/AuthRoute");
app.use("/api/auth", authRoute);

const userRoute = require("./routes/UserRoute");
app.use("/api/user", userRoute);

const propertyRoute = require("./routes/PropertyRoute");
app.use("/api/property", propertyRoute);

const transactionRoute = require("./routes/TransactionRoute");
app.use("/api/transaction", transactionRoute);

//Server start
app.listen(port, () => console.log("Server is running on port " + port));
