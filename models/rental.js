const Joi = require('joi');
const mongoose = require('mongoose');
const { customerSchema } = require('./customer')
const { movieSchema } = require('./movie')


const rentalSchema = ({
  customer: {
    type: customerSchema,
    required: true
  },
  movie: {
    type: movieSchema,
    required: true
  }
})


const Rental = mongoose.model('Rental', rentalSchema)
