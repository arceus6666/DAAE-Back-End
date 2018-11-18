const Student = require('../models/student')

function insertStudent(req, res) {
  var student = new Student({
    code: req.body.code,
    name: req.body.name,
    career: req.body.career,
    entryDate: req.body.entryDate,
    personalInfo: req.body.personalInfo,
    tutors: req.body.tutors
  })
  student.save().then(
    (us) => {
      res.send(us)
    },
    (err) => {
      res.send(err)
    }
  )
}

function getAll(req, res) {
  Student.find({}, (err, students) => {
    if (!err) {
      res.status(200).send(students)
    } else {
      res.status(500).send(err)
    }
  })
}

function getByCode(req, res) {
  Student.find({ code: req.query.param }, (err, student) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(student)
    }
  })
}

module.exports = {
  insertStudent,
  getAll,
  getByCode
}
