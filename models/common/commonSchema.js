const Joi = require('joi');

const commonSchema = {
    register :  Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().min(8).max(16).required(),
            cpassword:Joi.string().required().valid(Joi.ref('password'))
        }),
        createAadhar :  Joi.object().keys({
            firstName: Joi.string().max(16).min(3).required(),
            lastName: Joi.string().max(16).min(3).required(),
            address1: Joi.string().max(16).min(3).required(),
            address2: Joi.string().max(16).min(3).required(),
            city:Joi.string().required(),
            pincode:Joi.number().required(),
            phone:Joi.number().required(),
            lastName: Joi.string().max(16).min(3).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().min(8).max(16).required(),
            cpassword:Joi.string().required().valid(Joi.ref('password'))
        }),
    login :  Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required()
    })
}
    



module.exports = commonSchema