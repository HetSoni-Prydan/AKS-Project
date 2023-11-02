const jwt = require('jsonwebtoken');
const {User} = require("../Models/Register.Model");
const { ErrorOccur, CorrectResponse } = require('../Helper/respose');



const secretKey = process.env.SECREAT_KEY;

const TokenVerify = async(req, res, next) => {
    try {
        
        let token = req.headers.authorization;
        
        token = token.split(" ")[1];
        const VerifyUser = await jwt.verify(token, secretKey);
        // console.log(VerifyUser);

       
        next();

    } catch (error) {
     ErrorOccur(res, "Not Verify");
     next(); 
    }
}

module.exports = {TokenVerify};