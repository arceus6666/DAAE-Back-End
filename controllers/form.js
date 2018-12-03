const Form = require('../models/form')

function insertForm(req, res) {
  console.log(req.body)
  var form = new Form({
    category: req.body.category,
    registration_date: Date.now(),
    last_modified: Date.now(),
    student_code: req.body.student_code,
    career: req.body.career,
    status: req.body.status,
    digital: req.body.digital,
    code: req.body.code,
    materia_incompleta: req.body.materia_incompleta,
    examen_de_suficiencia: req.body.examen_de_suficiencia,
    version: req.body.version
  })
  form.save().then(
    (us) => {
      res.send(us)
    },
    (err) => {
      res.status(500).send(err)
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

function multyGet(req, res) {
  let param = req.query.param + ''
  param = param.split(' ')
  // console.log('///////\n')
  // [0]=type,[1]=status,[2]=career,[3]=date
  if (param[0] === 'undefined') {
    param[0] = ''
  }
  if (param[1] === 'undefined') {
    param[1] = ''
  }
  if (param[2] === 'undefined') {
    param[2] = ''
  }
  if (param[3] === 'undefined') {
    param[3] = ''
  }

  let conditions = {
    full: param[0] !== '' && param[1] !== '' && param[2] !== '' && param[3] !== '',
    empty: param[0] === '' && param[1] === '' && param[2] === '' && param[3] === '',
    typeOnly: param[0] !== '' && param[1] === '' && param[2] === '' && param[3] !== '',
    statusOnly: param[0] === '' && param[1] !== '' && param[2] === '' && param[3] === '',
    careerOnly: param[0] === '' && param[1] === '' && param[2] !== '' && param[3] === '',
    dateOnly: param[0] === '' && param[1] === '' && param[2] === '' && param[3] !== '',
    typeStatus: param[0] !== '' && param[1] !== '' && param[2] === '' && param[3] === '',
    typeStatusCareer: param[0] !== '' && param[1] !== '' && param[2] !== '' && param[3] === '',
    typeStatusDate: param[0] !== '' && param[1] !== '' && param[2] === '' && param[3] !== '',
    typeCareer: param[0] !== '' && param[1] === '' && param[2] !== '' && param[3] === '',
    typeCareerDate: param[0] !== '' && param[1] === '' && param[2] !== '' && param[3] !== '',
    typeDate: param[0] !== '' && param[1] === '' && param[2] === '' && param[3] !== '',
    statusCareer: param[0] === '' && param[1] !== '' && param[2] !== '' && param[3] === '',
    statusCareerDate: param[0] === '' && param[1] !== '' && param[2] !== '' && param[3] !== '',
    statusDate: param[0] === '' && param[1] !== '' && param[2] === '' && param[3] !== '',
    careerDate: param[0] === '' && param[1] === '' && param[2] !== '' && param[3] !== ''
  }

  console.log(param)

  if (conditions.empty) {
    console.log(1)
    Form.find({}, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.full) {
    console.log(2)
    Form.find({ category: param[0], status: param[1], career: param[2], registration_date: new Date(param[3]) }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.typeOnly) {
    console.log(3)
    Form.find({ category: param[0] }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.statusOnly) {
    console.log(4)
    Form.find({ status: param[1] }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.careerOnly) {
    console.log(5)
    Form.find({ career: param[2] }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.dateOnly) {
    console.log(6)
    let d = new Date(param[3])
    d.setDate(d.getDate() + 1)
    Form.find({ registration_date: { $gte: new Date(param[3]), $lt: d } }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.typeStatus) {
    console.log(7)
    Form.find({ category: param[0], status: param[1] }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.typeCareer) {
    console.log(8)
    Form.find({ category: param[0], career: param[2] }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.typeDate) {
    console.log(9)
    let d = new Date(param[3])
    d.setDate(d.getDate() + 1)
    Form.find({ category: param[0], registration_date: { $gte: new Date(param[3]), $lt: d } }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.typeStatusCareer) {
    console.log(10)
    Form.find({ category: param[0], status: param[1], career: param[2] }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.typeStatusDate) {
    console.log(11)
    let d = new Date(param[3])
    d.setDate(d.getDate() + 1)
    Form.find({ category: param[0], status: param[1], registration_date: { $gte: new Date(param[3]), $lt: d } }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.typeCareerDate) {
    console.log(12)
    let d = new Date(param[3])
    d.setDate(d.getDate() + 1)
    Form.find({ category: param[0], career: param[2], registration_date: { $gte: new Date(param[3]), $lt: d } }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.statusCareer) {
    console.log(13)
    Form.find({ status: param[1], career: param[2] }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.statusDate) {
    console.log(14)
    let d = new Date(param[3])
    d.setDate(d.getDate() + 1)
    Form.find({ status: param[1], registration_date: { $gte: new Date(param[3]), $lt: d } }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.statusCareerDate) {
    console.log(15)
    let d = new Date(param[3])
    d.setDate(d.getDate() + 1)
    Form.find({ status: param[1], career: param[2], registration_date: { $gte: new Date(param[3]), $lt: d } }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  } else if (conditions.careerDate) {
    console.log(16)
    let d = new Date(param[3])
    d.setDate(d.getDate() + 1)
    Form.find({ career: param[2], registration_date: { $gte: new Date(param[3]), $lt: d } }, (err, forms) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(forms)
        res.status(200).send(forms)
      }
    })
  }
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
  multyGet,
  deleteByID
}
