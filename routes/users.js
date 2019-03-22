const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, validate} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')


router.get('/me', auth, async (req, res) => {
  // get req.user from auth middleware - web token client has to pass it in otherwise won't reach this point
 const user = await User.findById(req.user._id).select('-password')
 res.send(user)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) res.status(400).send(error.details[0].message)

  let user = await User.findOne({email: req.body.email})
  if (user) return res.status(400).send('User already registered')

  user = new User(_.pick(req.body, ['name', 'email', 'password']))
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()

  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']))
  // next time we make an api call we will send this to server

  res.send(_.pick(user, ['_id','name', 'email']))
})

// loggout route not needed - not storing token on server. Implement logout on client not on server. 

module.exports = router
