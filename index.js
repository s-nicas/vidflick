const config = require('config')
const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const home = require('./routes/home')
const auth = require('./routes/auth')
const users = require('./routes/users')
const express = require('express')
const app = express();
const error = require('./middleware/error')
require('express-async-errors')


 if (!config.get('jwtPrivateKey')){
   console.error('FATAL ERROR: jwtPrivateKey is not defined')
   process.exit(1);
 }

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB ...', err))


// will parse the request to json - and give us access to req.body
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('api/auth', auth)
app.use('/', home)

app.use(error)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
