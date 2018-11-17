const mongoose = require('mongoose')
const Schema = mongoose.Schema

var formSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  digital: {
    type: Boolean,
    default: false,
    url: {
      type: String,
      default: '',
      requiered: true
    },
    required: true
  },
  status: {
    type: String,
    default: 'Iniciado',
    required: true
  },
  career: {
    type: String,
    required: true
  },
  student_code: {
    type: Number,
    required: true
  },
  materia_incompleta: {
    type: Boolean,
    default: false,
    materia: {
      type: String,
      requiered: true
    },
    semestre: {
      type: String,
      times: {
        type: Number,
        default: 0,
        requiered: true
      },
      requiered: true
    }
  },
  examen_de_suficiencia: {
    type: Boolean,
    default: false,
    times: {
      type: Number,
      default: 0,
      requiered: true
    }
  },
  last_modified: {
    type: Date,
    default: Date.now(),
    requiered: true
  },
  registration_date: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

var Form = mongoose.model('Form', formSchema)

module.exports = Form
