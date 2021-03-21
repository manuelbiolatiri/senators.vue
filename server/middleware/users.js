"use strict";
const Joi = require('@hapi/joi');

const registerMiddleware = {
    checkSignUp(req, res, next) {
        const { email } = req.body;

        // check if email value has @(mail service).com
        if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(email))) {
            return res.status(422).json({
                status: 'error',
                error: 'invalid email format'
            })
        }
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(6).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        });
        const { error } = schema.validate(req.body, {
            allowUnknown: true,
            abortEarly: true
        });
        if (error) {
            return res.status(422).json({
                error: error.details[0].message.replace(/['"]/g, '')
            })
        }
        next();
    },
    login(req, res, next) {
        if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(req.body.email))) {
            return res.status(422).json({
                status: 'error',
                error: 'invalid email format'
            })
        }
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body, {
            allowUnknown: true,
            abortEarly: true
        });
        if (error) {
            return res.status(422).json({
                error: error.details[0].message.replace(/['"]/g, '')
            })
        }
        next();
    }
}

// export registerMiddleware to routes
module.exports = registerMiddleware;