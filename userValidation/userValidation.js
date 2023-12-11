

const Joi = require('joi');

function registration_validation(payload) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        department: Joi.string().min(3).max(30).required(),

    });

    return schema.validate(payload)

}
function apply_leave_validation(payload) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        department: Joi.string().min(3).max(30).required(),
        leavetype: Joi.string().min(3).max(30).required(),
        startdate: Joi.date().required(),
        enddate: Joi.date().required(),
    });

    return schema.validate(payload)
}
module.exports = { registration_validation, apply_leave_validation };
