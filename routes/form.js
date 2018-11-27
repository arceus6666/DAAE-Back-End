const express = require('express')
const ctrl = require('../controllers/form')

const api = express.Router()

api.post('/register', ctrl.insertForm)
api.put('/update', ctrl.update)
api.get('/all', ctrl.getAll)
api.get('/category', ctrl.getByCategory)
api.get('/semester', ctrl.getBySemester)
api.get('/career', ctrl.getByCareer)
api.get('/status', ctrl.getByStatus)
api.get('/search', ctrl.multyGet)

// api.get('/find', ctrl.getById)
module.exports = api
