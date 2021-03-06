const mongoose = require('mongoose')
const User = require('./user')

const Schema = mongoose.Schema

var logSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
