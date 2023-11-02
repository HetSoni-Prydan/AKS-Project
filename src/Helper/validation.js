const joi = require('@hapi/joi');

const RegisterUser = joi.object({

    firstName: joi.
        string(),

    lastName: joi.
        string(),

    email: joi.string().email(),

    password: joi.
        string(),

    mobile: joi.
        number(),

});


module.exports = { RegisterUser };