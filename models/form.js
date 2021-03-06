const mongoose = require('mongoose')
const Schema = mongoose.Schema

var formSchema = new Schema({
  //tipo
  category: {
    type: String,
    required: true
  },
  //fecha de entrada
  registration_date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  //fecha de modificacion
  last_modified: {
    type: Date,
    default: Date.now(),
    required: true
  },
  //estudiante
  student_code: {
    type: Number,
    required: true
  },
  //carrera
  career: {
    type: String,
    required: true
  },
  //estado
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  //respaldo
  digital: {
    url: {
      type: String,
      default: ''
    },
    have: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  code: {
    type: String,
    //revisar
    unique: true,
    required: true
  },
  materia_incompleta: {
    type: Boolean,
    default: false,
    materia: {
      type: String,
      required: true
    },
    semestre: {
      type: String,
      times: {
        type: Number,
        default: 0,
        required: true
      },
      required: true
    }
  },
  examen_de_suficiencia: {
    type: Boolean,
    default: false,
    times: {
      type: Number,
      default: 0,
      required: true
    }
  },
  version: {
    type: Number,
    required: true
  }
})

var Form = mongoose.model('Form', formSchema)

module.exports = Form
