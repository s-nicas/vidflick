const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength:18
  }
}))


function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(10).max(18).required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer
exports.validate = validateCustomer
