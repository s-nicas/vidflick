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

function validateRental(rental){
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.String().required()
  }
  return Joi.validate(rental, schema)
}

exports.Rental = Rental
exports.validate = validateRental
