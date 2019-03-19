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









module.exports = router;
