const express = require('express')
const ctrl = require('../controllers/user')

const api = express.Router()

api.post('/register', ctrl.register)
api.put('/update', ctrl.update)
api.get('/login', ctrl.login)
api.get('/find', ctrl.getById)
api.get('/all', ctrl.getAll)

module.exports = api
