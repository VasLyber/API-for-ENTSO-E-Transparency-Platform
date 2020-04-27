const express = require('express');
const sequelize = require('./model/connect.js')
const app = express();
const router = require('./Routes/index.js')
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/energy/api/', router);

app.listen(8765, () => console.log("Web server"));
start();

async function start() {
    await connect();
}

async function connect() {
  try {
    await sequelize.sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
const [results, metadata] = await sequelize.User.findAll();
    console.log("Results: \n",results.dataValues);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}}
