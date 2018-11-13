const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  code: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    secondName: String,
    firstSurname: {
      type: String,
      required: true
    },
    secondSurname: {
      type: String,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  role: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    required: true
  }
})

userSchema.pre('save', (next) => {
  var user = this
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next()
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next()
      user.password = hash
      next()
    })
  })
})

var User = mongoose.model('User', userSchema)

module.exports = User
