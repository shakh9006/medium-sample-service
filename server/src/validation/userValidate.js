const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = (data) => {
    return schema.validate(data)
}