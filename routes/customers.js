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
  const customers = await Customer.find();
  res.send(customers);
});


router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  let customer = await new Customer({name: req.body.name, isGold: req.body.isGold, phone: req.body.phone})
  genre = customer.save()

  res.send(customer)
})

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer)
})

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name, isGold: req.body.isGold, phone: req.body.phone}, {new: true})

  if(!customer) return res.status(400).send('The customer with the given ID was not found.')

  res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)

  if(!customer) return res.status(400).send('The customer with the given ID was not found.')

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
