const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./sequelize')
const associate = require('./models/Associations')

associate()

sequelize.sync()
.then(() => console.log("DB synced"))

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('common'));

const port = process.env.PORT || 3000;

//Routes
const userRoute = require('./routes/UserRoute')
app.use('/api/user', userRoute)

const roleRoute = require('./routes/RoleRoute')
app.use('/api/role', roleRoute)

const propertyRoute = require('./routes/PropertyRoute')
app.use('/api/property', propertyRoute)

const transactionRoute = require('./routes/TransactionRoute')
app.use('/api/transaction', transactionRoute)

//Server start
app.listen(port, () => console.log("Server is running"))