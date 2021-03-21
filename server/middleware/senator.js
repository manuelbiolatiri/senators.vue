const Joi = require('@hapi/joi');
const senatorCheck = {
    checkSenator (req, res ,next) {

        if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(req.body.email))) {
            return res.status(422).json({
                status: 'error',
                error: 'invalid email format'
            })
        }
        const schema = Joi.object({
            email: Joi.string().required(),
            name: Joi.string().min(3).required(),
            state: Joi.string().required(),
            phoneNumber: Joi.string().required()
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

// export senatorCheck to routes
module.exports = senatorCheck;
