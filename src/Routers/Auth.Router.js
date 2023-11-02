const express = require("express");
const { UserImageUpload } = require("../Helper/ImageUpload");
const { Register, Login, updateUser} = require("../Controller/Auth.Controller");
const { TokenVerify } = require("../Middelware/Login.Verify");

const app = express.Router();

app.post('/register',UserImageUpload,Register)
app.post('/login', Login);
app.patch('/editProfile/:id',[TokenVerify,UserImageUpload],updateUser)

module.exports = app;
