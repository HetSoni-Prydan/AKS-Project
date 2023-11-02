const jwt = require('jsonwebtoken');
const {User} = require("../Models/Register.Model");
const { ErrorOccur, CorrectResponse } = require('../Helper/respose');



const secretKey = process.env.SECREAT_KEY;

const TokenVerify = async(req, res, next) => {
    try {
        
    //    console.log("hello");
        let token = req.headers.authorization;
        // token = req.cookies.jwt;
        // console.log(token);
    
        token = token.split(" ")[1];
        const VerifyUser = jwt.verify(token, secretKey,(err,decoded) => {
            if(err) {
                console.log(err); 
            } 
            // console.log(decoded);
        });

        CorrectResponse(res,200,VerifyUser,"Data")
        next();

    } catch (error) {
     ErrorOccur(res, "Not Verify");
     next(); 
    }
}

module.exports = {TokenVerify};