const mongoose = require('mongoose')
const express = require('express')
const app = express();

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const home = require('./routes/home')



mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB ...', err))


// will parse the request to json - and give us access to req.body
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/', home)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
