const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre')

const movieSchema = new mongoose.Schema({
  // representation of our modal - what we will store in MongoDB
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 10
    },
    genre: {
      type: genreSchema,
      required: true
    },

    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 200
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 200
    }
  })

const Movie = mongoose.model('Movie', movieSchema)

// what the clien sends us - input to API

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(200).required(),
    dailyRentalRate: Joi.number().min(0).max(200).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie
exports.validate = validateMovie
exports.movieSchema = movieSchema
