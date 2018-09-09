const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
/*
const xxxApi = requiere('./routes/xxx')
...

*/

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

/*
app.use('/xxxs', xxxApi)
...

*/

app.get('/', (req, res) => {
  res.status(200).send('Todo correcto!')
})

module.exports = app
