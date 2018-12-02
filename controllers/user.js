const User = require('../models/user')
const service = require('../services')

function register(req, res) {
  let user = new User({
    email: req.body.email,
    code: req.body.code,
    name: req.body.name,
    password: req.body.password,
    registerDate: Date.now(),
    role: req.body.role,
    lastLogin: Date.now()
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

function login(req, res) {
  let param = req.query.param.split(' ')
  User.findOne({ code: param[0] }, (err, user) => {
    console.log(user)
    if (err || user === null) {
      res.status(500).send({ message: 'Usuario inexistente.' })
    } else {
      let u = user
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
    }
  })
}

function update(req, res) {
  User.findOne({ _id: req.body._id }, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      user.email = req.body.email
      user.code = req.body.code
      user.name = req.body.name
      user.password = req.body.password
      user.registerDate = req.body.registerDate
      user.role = req.body.role
      user.lastLogin = req.body.lastLogin
      user.save((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          console.log(user)
          res.status(200).send({ mensaje: 'Se guardó la informacion', ok: true })
        }
      })
    }
  })
}

function getById(req, res) {
  User.findOne({ _id: req.query.param }, (err, user) => {
    if (!err) {
      res.status(200).send(user)
    } else {
      res.status(500).send(err)
    }
  })
}

function getAll(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(users)
    }
  })
}

module.exports = {
  register,
  login,
  update,
  getById,
  getAll
}
