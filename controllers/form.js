const Form = require('../models/form')

function insertForm(req, res) {
  var form = new Form({
    category: req.body.category,
    version: req.body.version,
    code: req.body.code,
    digital: req.body.digital,
    status: req.body.status,
    student_code: req.body.student_code,
    materia_incompleta: req.body.materia_incompleta,
    examen_de_suficiencia: req.body.examen_de_suficiencia,
    last_modified: Date.now(),
    registration_date: Date.now()
  })
  form.save().then(
    (us) => {
      res.send(us)
    },
    (err) => {
      res.send(err)
    }
  )
}

function getAll(req, res) {
  Form.find({}, (err, forms) => {
    if (!err) {
      res.status(200).send(forms)
    } else {
      res.status(500).send(err)
    }
  })
}

function getByCategory(req, res) {
  Form.find({ category: { $regex: req.params.category } }, (err, forms) => {
    if (!err) {
      res.status(200).send(forms)
    } else {
      res.status(500).send(err)
    }
  })
}

function update(req, res) {
  Form.findOne({ code: req.params.code }, (err, form) => {
    if (err) {
      res.send(err)
    } else {
      // revisar
      form.category = req.body.category
      form.version = req.body.version
      form.code = req.body.code
      form.digital = req.body.digital
      form.status = req.body.status
      form.career = req.body.career
      form.student_code = req.body.student_code
      form.materia_incompleta = req.body.materia_incompleta
      form.examen_de_suficiencia = req.body.examen_de_suficiencia
      form.last_modified = Date.now()
      form.registration_date = req.body.registration_date
      form.save((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send({ mensaje: 'Se guardó la informacion' })
        }
      })
    }
  })
}

function getBySemester(req, res) {
  let param = req.query.param + ''
  param = param.split(' ')
  // revisar como llega el parametro
  let year = param[0]
  let semester = param[1]
  Form.find({
    registration_date: {
      $gte: new Date(year + '-' + (semester === 1 ? '01' : '07') + '-01T00:00:00.000Z'),
      $lt: (semester === 1 ? year + '-07' : year + 1 + '-01') + '-01T00:00:00.000Z'
    }
  }, (err, forms) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(forms)
    }
  })
}

function getByCareer(req, res) {
  Form.find({ career: req.query.param }, (err, forms) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(forms)
    }
  })
}

function getByStatus(req, res) {
  Form.find({ status: req.query.param }, (err, forms) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(forms)
    }
  })
}

function deleteByID(req, res) {
  Form.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send({ mensaje: 'Objeto eliminado' })
    }
  })
}

module.exports = {
  insertForm,
  update,
  getAll,
  getByCategory,
  getBySemester,
  getByCareer,
  getByStatus,
  deleteByID
}