const mongoose = require('mongoose')
const User = require('./user')

const Schema = mongoose.Schema

var logSchema = new Schema({
  user: {
    type: [mongoose.model('User').schema],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

var Log = mongoose.model('Log', logSchema)

module.exports = Log
