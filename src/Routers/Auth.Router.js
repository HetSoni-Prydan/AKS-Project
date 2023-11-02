const express = require("express");
const { UserImageUpload } = require("../Helper/ImageUpload");
const { Register, Login, hello} = require("../Controller/Auth.Controller");
const { TokenVerify } = require("../Middelware/Login.Verify");

const app = express.Router();

app.post('/hello',TokenVerify, hello);
app.post('/register',UserImageUpload,Register)
app.post('/login', Login);
app.patch('/editProfile',TokenVerify,)
module.exports = app;
