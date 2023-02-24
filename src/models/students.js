const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },

  email: {
    type: String,
    required: true,
    // unique: true,
    // validator(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Invalid Email");
    //   }
    // },
  },
  phone: {
    type: Number,
    required: true,
    // unique: [true, "Already in use"],
    // min: 10
  },
  address: {
    type: String,
    required: true,
    minlength: 6,
  },
});

//We will create a new collection
const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;






