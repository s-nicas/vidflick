const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


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


router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  let customer = await new Customer({name: req.body.name, isGold: req.body.isGold, phone: req.body.phone})

  res.send(customer)
})

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(2).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(10).required()
  };

  return Joi.validate(customer, schema);
}

module.exports = router;
