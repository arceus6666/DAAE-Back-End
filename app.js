const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const userApi = require('./routes/user')
const formApi = require('./routes/form')
const logApi = require('./routes/log')

/*
const xxxApi = requiere('./routes/xxx')
...
*/

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/users', userApi)
app.use('/forms', formApi)
app.use('logs', logApi)

/*
app.use('/xxxs', xxxApi)
...
*/

app.get('/', (req, res) => {
  res.status(200).send('Todo correcto!')
})

module.exports = app
