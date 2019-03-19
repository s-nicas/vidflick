const express = require('express')
const genres = require('./routes/genres')
const movies = require('./routes/customers')
const home = require('./routes/home')
const mongoose = require('mongoose')
const app = express();


mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB ...', err))


// will parse the request to json - and give us access to req.body
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/movies', movies)
app.use('/', home)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
