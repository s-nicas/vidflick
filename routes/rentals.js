const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Rental, validateRental } = require('../models/rental')
const { Customer } = require('../models/customer')
const { Movie } = require('../models/movie')
const Fawn = require('fawn')
const auth = require('../middleware/auth')

Fawn.init(mongoose)

router.get('/', async (req, res) => {
  const rentals = await Rental.find()
  res.send(rentals)
})

router.post('/', auth, async (req, res) => {
  const { error } = validateRental(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findById(req.body.customerId)
  console.log(customer)
  if (!customer) return res.status(400).send('Could not find customer with that ID')

  const movie = await Movie.findById(req.body.movieId)
  if (!movie) return res.status(400).send('Could not find movie with that ID')

  if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock')

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try{
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', {_id:movie._id},{
      $inc:{ numberInStock: - 1}
      })
      .run()
      res.send(rental)
  }
    catch(ex){
    res.status(500).send('Something Failed')
  }



})





module.exports = router
