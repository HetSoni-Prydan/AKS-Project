const joi = require('@hapi/joi');

const RegisterUser = joi.object({

    firstName: joi.
        string().required(),

    lastName: joi.
        string(),

    email: joi.string().email().required(),

    password: joi.
        string().required(),

    mobile: joi.
        number().required(),

});


module.exports = { RegisterUser };