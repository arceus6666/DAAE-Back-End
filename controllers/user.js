const User = require('../models/user')
const service = require('../services')

function register (req, res) {
  let user = new User({
    email: req.body.email,
    // check
    code: req.body.code,
    name: req.body.name,
    password: req.body.password,
    registerDate: req.body.registerDate,
    role: req.body.role,
    lastLogin: req.body.lastLogin
  })

  user.save((err) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.status(200).send({ token: service.createToken(user) })
    }
  })
}

function login (req, res) {
  let param = req.query.param.split(' ')
  User.find({ email: param[0] }, (err, user) => {
    if (!err) {
      let u = user[0]
      if (u.password === param[1]) {
        res.status(200).send({ role: u.role, _id: u._id })
        user.lastLogin = Date.now()
        u.save((err) => {
          if (err) {
            console.log(err)
            res.status(500).send(err)
          }
        })
      } else {
        console.log('error: ' + err)
        res.status(403).send({ message: 'Contraseña incorrecta' })
      }
    } else {
      res.status(500).send({ message: 'Usuario inexistente.' })
    }
  })
}

function getById (req, res) {
  User.findOne({ _id: req.query.param }, (err, user) => {
    if (!err) {
      res.status(200).send(user)
    } else {
      res.status(500).send(err)
    }
  })
}

module.exports = {
  register,
  login,
  getById
}
