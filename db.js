const mongoose = require('mongoose')

mongose.connect.('mongodb://localhost/vidfick', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.error('Could not connect to MongoDb')
})
