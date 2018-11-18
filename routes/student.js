const express = require('express')
const ctrl = require('../controllers/student')

const api = express.Router()

api.post('/students-register', ctrl.insertStudent)
api.get('/students', ctrl.getAll)
api.get('/students-code', ctrl.getByCode)

module.exports = api
