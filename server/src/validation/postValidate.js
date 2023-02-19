const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required()
});

module.exports = (data) => {
    return schema.validate(data)
}