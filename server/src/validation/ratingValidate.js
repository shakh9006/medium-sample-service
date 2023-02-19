const Joi = require('joi');

const schema = Joi.object().keys({
    post_id: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
});

module.exports = (data) => {
    return schema.validate(data)
}