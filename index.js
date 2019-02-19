const express = require('express')
const Joi = require('joi')
const genres = require('./routes/genres')
const home = require('./routes/home')

const app = express();
// will parse the request to json - and give us access to req.body
app.use(express.json())
app.use('/api/genres', genres)
app.use('/', home)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
