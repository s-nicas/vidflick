const express = require('express')
const Joi = require('joi')

const app = express();

app.use(express.json())

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))


app.get('/api/genres', (req, res) => {
  res.send(genres)
})
