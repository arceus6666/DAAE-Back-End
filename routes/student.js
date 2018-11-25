const express = require('express')
const ctrl = require('../controllers/student')

const api = express.Router()

api.post('/register', ctrl.insertStudent)
api.get('/all', ctrl.getAll)
api.get('/code', ctrl.getByCode)

module.exports = api
