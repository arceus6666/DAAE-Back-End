const express = require('express')
const ctrl = require('../controllers/user')

const api = express.Router()

api.post('/register', ctrl.register)
api.get('login', ctrl.login)
api.get('/find', ctrl.getById)

module.exports = api