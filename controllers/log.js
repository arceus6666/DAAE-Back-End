const Log = require('../models/log')

function insertLog(req, res) {
  var log = new Log({
    user: req.body.userId,
    message: req.body.message,
    date: Date.now()
  })
  log.save().then(
    (us) => {
      res.send(us)
    },
    (err) => {
      res.send(err)
    }
  )
}

function getAll(req, res) {
  Log.find({}, (err, logs) => {
    if (!err) {
      res.status(200).send(logs)
    } else {
      res.status(500).send(err)
    }
  })
}

module.exports = {
  insertLog,
  getAll
}
