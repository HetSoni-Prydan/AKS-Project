const express = require("express");
const { UserImageUpload } = require("../Helper/ImageUpload");
const { Register, Login } = require("../Controller/Auth.Controller");

const app = express.Router();

app.post('/register',UserImageUpload, Register)
app.post('/login',Login);

module.exports = app;
