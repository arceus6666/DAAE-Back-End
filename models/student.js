const mongoose = require('mongoose')
const Schema = mongoose.Schema

var studentSchema = new Schema({
  code: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    secondName: String,
    firstSurname: {
      type: String,
      required: true
    },
    secondSurname: {
      type: String,
      required: true
    }
  },
  career: {
    type: String,
    required: true
  },
  entryDate: {
    type: Date,
    required: true
  },
  personalInfo: {
    school: {
      name: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      }
    },
    nationality: {
      type: String,
      default: 'Boliviana',
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    bloodType: {
      type: String,
      required: true
    },
    ci: {
      number: {
        type: Number,
        unique: true,
        required: true
      },
      extension: {
        type: String,
        required: true
      },
      //unique: true,
      //required: true
    },
    direction: {
      type: String,
      required: true
    },
    cellphoneNumber: Number,
    phoneNumber: Number,
  },
  tutors: {
    firstTutor: {
      name: {
        firstName: {
          type: String,
          required: true
        },
        secondName: String,
        firstSurname: {
          type: String,
          required: true
        },
        secondSurname: {
          type: String,
          required: true
        }
      },
      direction: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: Number,
        required: true
      }//,
      //required: true
    },
    secondTutor: {
      name: {
        firstName: {
          type: String,
          required: true
        },
        secondName: String,
        firstSurname: {
          type: String,
          required: true
        },
        secondSurname: {
          type: String,
          required: true
        }
      },
      direction: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: Number,
        required: true
      }
    }
  }
})

var Student = mongoose.model('Student', studentSchema)

module.exports = Student
