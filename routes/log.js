const express = require('express')
const ctrl = require('../controllers/log')

const api = express.Router()

api.post('logs-log', ctrl.insertLog)
api.get('/logs', ctrl.getAll)

module.exports = api
