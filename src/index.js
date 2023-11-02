const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const master = require("./Routers/Auth.Router");
require('./Models/Register.Model');
require('./Helper/Connection');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( master );

app.listen(8000, () => {
    console.log('localhost:8000');
})