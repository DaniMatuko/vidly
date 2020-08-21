const mongoose = require('mongoose');
const Joi = require('joi');


// Schema 
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: String,
    isGold: Boolean
});

// Model
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(2).required(),
        // phone: Joi.number().integer().minlength(9).maxlength(12).optional(),
        // isGold: Joi.boolean().optional()
        phone: Joi.string().optional(),
        isGold: Joi.boolean().optional()
    };

    return Joi.validate(customer, schema);
}


exports.Customer = Customer;
exports.validateCustomer = validateCustomer;