const express = require('express')
const ctrl = require('../controllers/form')

const api = express.Router()

api.post('/forms-register', ctrl.insertForm)
api.put('/forms-update', ctrl.update)
api.get('/forms', ctrl.getAll)
api.get('/forms-category', ctrl.getByCategory)
api.get('/forms-semester', ctrl.getBySemester)
api.get('/forms-career', ctrl.getByCareer)
api.get('/forms-status', ctrl.getByStatus)

//api.get('/find', ctrl.getById)
module.exports = api
