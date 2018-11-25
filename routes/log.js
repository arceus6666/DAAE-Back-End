const express = require('express')
const ctrl = require('../controllers/log')

const api = express.Router()

api.post('/log', ctrl.insertLog)
api.get('/all', ctrl.getAll)

module.exports = api
